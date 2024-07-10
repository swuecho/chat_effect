import { v4 as uuidv4 } from 'uuid';
import OpenAI from 'openai'

import * as dotenv from 'dotenv'
import { insertChatMessage, insertChatSession } from './queries';

dotenv.config()

// Create the OpenAI client
const openai = new OpenAI({
        apiKey: process.env.DEEPSEEK_API_KEY,
        baseURL: "https://api.deepseek.com/v1/"
})

interface Message {
        role: string
        content: string
}

// Implement the ChatBot service
export async function generateResponse(messages: Message[], db: any, model: string = 'deepseek-coder') {
        const client = db.client
        // Create a new chat session
        const sessionUuid = uuidv4();
        const userId = 7;
        const topic = "test";
        const chatSession = await insertChatSession({
                user_id: userId,
                uuid: sessionUuid,
                topic: topic,
                model: model,
                max_tokens: 4090,
                temperature: 0.8,
                n: 1,
        }, client);
        // Store all input messages
        for (const message of messages) {
                await insertChatMessage({
                        uuid: uuidv4(),
                        chat_session_uuid: sessionUuid,
                        role: message.role,
                        content: message.content,
                        user_id: userId,
                        created_by: userId,
                        updated_by: userId,
                        score: 0,
                        token_count: message.content.length, // This is a simplification, you may want to use a proper tokenizer
                }, client);
        }
        const response = await openai
                .chat.completions.create({
                        model,
                        // @ts-ignore
                        messages: messages,
                        max_tokens: 4000,
                        n: 1,
                        stop: null,
                        temperature: 0.8,
                })
        // Store the generated response
        const generatedMessage = response.choices[0].message;
        await insertChatMessage({
                uuid: uuidv4(),
                chat_session_uuid: sessionUuid,
                role: generatedMessage.role,
                content: generatedMessage.content,
                user_id: userId,
                created_by: userId,
                updated_by: userId,
                score: 0,
                token_count: generatedMessage.content?.length || 0,
        }, client);
        return [sessionUuid, response];

}