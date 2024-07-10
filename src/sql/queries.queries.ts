/** Types generated for queries found in "src/sql/queries.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

export type Json = null | boolean | number | string | Json[] | { [key: string]: Json };

/** 'InsertChatSession' parameters type */
export interface IInsertChatSessionParams {
  max_tokens?: number | null | void;
  model?: string | null | void;
  n?: number | null | void;
  temperature?: number | null | void;
  topic?: string | null | void;
  user_id?: number | null | void;
  uuid?: string | null | void;
}

/** 'InsertChatSession' return type */
export interface IInsertChatSessionResult {
  active: boolean;
  createdAt: Date;
  debug: boolean;
  id: number;
  maxLength: number;
  maxTokens: number;
  model: string;
  n: number;
  summarizeMode: boolean;
  temperature: number;
  topic: string;
  topP: number;
  updatedAt: Date;
  userId: number;
  uuid: string;
}

/** 'InsertChatSession' query type */
export interface IInsertChatSessionQuery {
  params: IInsertChatSessionParams;
  result: IInsertChatSessionResult;
}

const insertChatSessionIR: any = {"usedParamSet":{"user_id":true,"uuid":true,"topic":true,"model":true,"max_tokens":true,"temperature":true,"n":true},"params":[{"name":"user_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":91,"b":98}]},{"name":"uuid","required":false,"transform":{"type":"scalar"},"locs":[{"a":101,"b":105}]},{"name":"topic","required":false,"transform":{"type":"scalar"},"locs":[{"a":108,"b":113}]},{"name":"model","required":false,"transform":{"type":"scalar"},"locs":[{"a":116,"b":121}]},{"name":"max_tokens","required":false,"transform":{"type":"scalar"},"locs":[{"a":124,"b":134}]},{"name":"temperature","required":false,"transform":{"type":"scalar"},"locs":[{"a":137,"b":148}]},{"name":"n","required":false,"transform":{"type":"scalar"},"locs":[{"a":151,"b":152}]}],"statement":"INSERT INTO chat_session (user_id, uuid, topic, model, max_tokens, temperature, n)\nVALUES (:user_id, :uuid, :topic, :model, :max_tokens, :temperature, :n)\nRETURNING *"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO chat_session (user_id, uuid, topic, model, max_tokens, temperature, n)
 * VALUES (:user_id, :uuid, :topic, :model, :max_tokens, :temperature, :n)
 * RETURNING *
 * ```
 */
export const insertChatSession = new PreparedQuery<IInsertChatSessionParams,IInsertChatSessionResult>(insertChatSessionIR);


/** 'InsertChatMessage' parameters type */
export interface IInsertChatMessageParams {
  chat_session_uuid?: string | null | void;
  content?: string | null | void;
  created_by?: number | null | void;
  role?: string | null | void;
  score?: number | null | void;
  token_count?: number | null | void;
  updated_by?: number | null | void;
  user_id?: number | null | void;
  uuid?: string | null | void;
}

/** 'InsertChatMessage' return type */
export interface IInsertChatMessageResult {
  chatSessionUuid: string;
  content: string;
  createdAt: Date | null;
  createdBy: number;
  id: number;
  isDeleted: boolean;
  isPin: boolean;
  llmSummary: string;
  raw: Json | null;
  role: string;
  score: number;
  tokenCount: number;
  updatedAt: Date | null;
  updatedBy: number;
  userId: number;
  uuid: string;
}

/** 'InsertChatMessage' query type */
export interface IInsertChatMessageQuery {
  params: IInsertChatMessageParams;
  result: IInsertChatMessageResult;
}

const insertChatMessageIR: any = {"usedParamSet":{"uuid":true,"chat_session_uuid":true,"role":true,"content":true,"user_id":true,"created_by":true,"updated_by":true,"token_count":true,"score":true},"params":[{"name":"uuid","required":false,"transform":{"type":"scalar"},"locs":[{"a":127,"b":131}]},{"name":"chat_session_uuid","required":false,"transform":{"type":"scalar"},"locs":[{"a":134,"b":151}]},{"name":"role","required":false,"transform":{"type":"scalar"},"locs":[{"a":154,"b":158}]},{"name":"content","required":false,"transform":{"type":"scalar"},"locs":[{"a":161,"b":168}]},{"name":"user_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":171,"b":178}]},{"name":"created_by","required":false,"transform":{"type":"scalar"},"locs":[{"a":181,"b":191}]},{"name":"updated_by","required":false,"transform":{"type":"scalar"},"locs":[{"a":194,"b":204}]},{"name":"token_count","required":false,"transform":{"type":"scalar"},"locs":[{"a":207,"b":218}]},{"name":"score","required":false,"transform":{"type":"scalar"},"locs":[{"a":221,"b":226}]}],"statement":"INSERT INTO chat_message (uuid, chat_session_uuid, role, content, user_id, created_by, updated_by, token_count, score)\nVALUES (:uuid, :chat_session_uuid, :role, :content, :user_id, :created_by, :updated_by, :token_count, :score)\nRETURNING *"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO chat_message (uuid, chat_session_uuid, role, content, user_id, created_by, updated_by, token_count, score)
 * VALUES (:uuid, :chat_session_uuid, :role, :content, :user_id, :created_by, :updated_by, :token_count, :score)
 * RETURNING *
 * ```
 */
export const insertChatMessage = new PreparedQuery<IInsertChatMessageParams,IInsertChatMessageResult>(insertChatMessageIR);


