import {
        insertChatSession as InsertChatSessionQuery,
        insertChatMessage as InsertChatMessageQuery,
        IInsertChatSessionParams,
        IInsertChatMessageParams,
} from './sql/queries.queries'; // This file will be auto-generated by pgTyped

export interface IDatabaseConnection {
        query: (query: string, bindings: any[]) => Promise<{
            rows: any[];
        }>;
}


export const insertChatSession = async (params: IInsertChatSessionParams, client: IDatabaseConnection) => {
        const result = await InsertChatSessionQuery.run(params, client);
        return result
};

export const insertChatMessage = async (params: IInsertChatMessageParams, client: IDatabaseConnection) => {
        const result = await InsertChatMessageQuery.run(params, client);
        return result
};
