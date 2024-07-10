/* @name InsertChatSession */
INSERT INTO chat_session (user_id, uuid, topic, model, max_tokens, temperature, n)
VALUES (:user_id, :uuid, :topic, :model, :max_tokens, :temperature, :n)
RETURNING *;

/* @name InsertChatMessage */
INSERT INTO chat_message (uuid, chat_session_uuid, role, content, user_id, created_by, updated_by, token_count, score)
VALUES (:uuid, :chat_session_uuid, :role, :content, :user_id, :created_by, :updated_by, :token_count, :score)
RETURNING *;
