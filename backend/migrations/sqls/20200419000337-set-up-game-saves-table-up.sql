CREATE TABLE game_saves(
  id serial PRIMARY KEY,
  recourses BIGINT DEFAULT 0,
  data JSONB,
  created_on TIMESTAMP NOT NULL,
  last_interaction TIMESTAMP,
  archived BOOLEAN DEFAULT FALSE
);
