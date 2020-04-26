CREATE TABLE users(
  id serial PRIMARY KEY,
  email VARCHAR(100),
  password VARCHAR(100),
  game_save_id INTEGER REFERENCES game_saves(id) ON DELETE CASCADE,
  created_on TIMESTAMP NOT NULL,
  archived BOOLEAN DEFAULT FALSE
);
