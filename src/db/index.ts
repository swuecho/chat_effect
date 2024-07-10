import pg from 'pg';
import { Effect, Context, Layer } from 'effect';


// Database Pool
export class DatabasePool extends Context.Tag('DatabasePool')<DatabasePool, pg.Pool>() { }


// Scoped Client
interface ScopedClient {
        readonly client: pg.PoolClient;
        readonly close:  Effect.Effect<void, never, never>;
}

const acquireScopedClient = Effect.gen(function* (_) {
        const pool = yield* _(DatabasePool);
        const client = yield* _(Effect.tryPromise(() => pool.connect()));

        const close = Effect.sync(() => {
                console.log("Resource released");
                client.release();
        });

        return { client, close } as ScopedClient
});

const releaseScopedClient = (scopedClient: ScopedClient) => scopedClient.close;

export const scopedClient = Effect.acquireRelease(
        acquireScopedClient,
        releaseScopedClient
);


