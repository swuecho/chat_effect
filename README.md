# chat_effect

Basic LLM workflow with tracing and visualization. The converstation to LLM is add to `chat` database.

the workflow is written using TS(with Effect). The UI is from tempo and Chat


![image](https://github.com/swuecho/chat_effect/assets/666683/aee981a5-a289-4b51-ae82-be0d1d5dea64)

![image](https://github.com/swuecho/chat_effect/assets/666683/5c2a78d5-466d-4ace-bc2f-5241caaa6409)


![image](https://github.com/swuecho/chat_effect/assets/666683/91f9a4a5-0a02-4c12-9a8f-7b35d40837cb)

Chat https://github.com/swuecho/chat is the app I develop for converation with LLM. Here it is used as a frontend to display the converstaion. (the converstaion is logged into the database of a local chat app instance)

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
