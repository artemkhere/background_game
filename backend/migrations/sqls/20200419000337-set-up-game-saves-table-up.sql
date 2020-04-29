CREATE TABLE game_saves(
  id serial PRIMARY KEY,
  resources INT DEFAULT 0,
  game_state JSONB,
  created_on TIMESTAMP NOT NULL,
  last_interaction TIMESTAMP,
  archived BOOLEAN DEFAULT FALSE
);
