import { Effect, Layer } from "effect"

import { extractText } from './extract_text'
import { generateResponse } from './openai_api'
import pg from 'pg'
import * as path from 'path'
import * as FS from '@effect/platform/FileSystem'
import * as NodeContext from '@effect/platform-node/NodeContext'
import {
        BatchSpanProcessor,
} from "@opentelemetry/sdk-trace-base"

import { NodeSdk } from "@effect/opentelemetry"
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http"
import { execSync } from 'child_process';

import { fileURLToPath } from 'url';
import { scopedClient } from "./db"

import { DatabasePool } from "./db"
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


interface FileContent {
        filePath: string
        content: string
}

const processAllFiles = (dataDir: string) =>
        Effect.gen(function* () {
                const fs = yield* FS.FileSystem
                const files = yield* fs.readDirectory(dataDir)
                const filesPaths = files.filter(file => path.extname(file) === '.json').map(file => path.join(dataDir, file))
                const fileAndContentAll: FileContent[] = yield* Effect.forEach(filesPaths, (filePath) =>
                        fs.readFileString(filePath).pipe(
                                Effect.map((content) => extractText(JSON.parse(content))),
                                Effect.map((content) => ({ filePath, content })),
                                Effect.mapError(error => new Error(`Failed to read file ${filePath}: ${error.message}`))
                        )
                )
                return fileAndContentAll
        })


function gen_messages(text: string) {
        return [{ role: 'system', content: "Please summaryize the following text:" }, { role: 'user', content: text }]
}

let commitHash = '';
try {
        commitHash = execSync('git rev-parse HEAD').toString().trim().substring(0, 7);
        console.log('Current commit hash:', commitHash);
} catch (error) {
        console.error('Error retrieving commit hash:', error);
}
const NodeSdkLive = NodeSdk.layer(() => ({
        resource: { serviceName: "AI agent with version:" + commitHash },
        spanProcessor: new BatchSpanProcessor(new OTLPTraceExporter(
                { url: "http://192.168.0.135:4318/v1/traces" }
        ))
}))

let jsonDir = path.join(path.dirname(__dirname), 'ocr_json')
console.log(jsonDir)

let y = processAllFiles(jsonDir).pipe(
        Effect.map((files) => files.map(file => gen_messages(file.content))),
)

function fechSummary(summary: { role: string; content: string }[], db: any) {
        return Effect.tryPromise(() => generateResponse(summary, db)).pipe(
                Effect.tap((result) => Effect.annotateCurrentSpan("link", "http://192.168.0.135:8080/static/#/chat/" + result[0])),
                Effect.tap((result) => Effect.tap(Effect.currentSpan, (span) => span.attribute("session_id", result[0]))),
                Effect.withSpan('generateResponse')
        )
}

let z = Effect.scoped(
        Effect.gen(function* () {
                const summary_list = yield* y.pipe(
                        Effect.withSpan('processAllFiles'),
                )
                const db = yield* scopedClient
                // Use the client here
                yield* Effect.log("Client acquired and ready to use");
                const responses = yield* Effect.forEach(summary_list,
                        (summary) => fechSummary(summary, db), { concurrency: 'unbounded' }
                ).pipe(
                        Effect.withSpan('generateResponseAll'),

                )
                return responses
        }).pipe(Effect.withSpan('main'))
)

export const DatabasePoolLive = Layer.effect(
        DatabasePool,
        Effect.gen(function* (_) {
                return new pg.Pool({
                        connectionString: 'postgres://hwu:using555@192.168.0.135:5432/hwu'
                });
        })
);

Effect.runPromise(z.pipe(Effect.provide(NodeContext.layer),
        Effect.provide(NodeSdkLive), Effect.provide(DatabasePoolLive)
)).then(resp => resp.map(msg => console.log(msg)))
