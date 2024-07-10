# chat_effect

using `effect` and tracing to do basic LLM. The converstation to LLM is add to `chat` database.

the workflow is written using TS(with Effect). the UI is tempo and Chat

![image](https://github.com/swuecho/chat_effect/assets/666683/ace73b2e-fed4-4f00-9f3e-b0ab492510e7)

![image](https://github.com/swuecho/chat_effect/assets/666683/6259ec45-f353-406d-a6be-80ed8d2e3df4)

![image](https://github.com/swuecho/chat_effect/assets/666683/791d83d4-155d-4250-bf3d-6cbf82e06d22)

Tracing server is set up using the docker.zip in https://effect.website/docs/guides/observability/telemetry/tracing

```js
const NodeSdkLive = NodeSdk.layer(() => ({
        resource: { serviceName: "AI agent with version:" + commitHash },
        spanProcessor: new BatchSpanProcessor(new OTLPTraceExporter(
                { url: "http://tracing_server_host:4318/v1/traces" }
        ))
}))
```
## dev

```sh
npx pgtyped -w -c pgtyped.config.json
```

To install dependencies:

```bash
npm install
```

To run:

```bash
npx tsx src/index.ts 
```
