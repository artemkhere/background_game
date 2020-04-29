ALTER TABLE game_saves
ADD COLUMN user_id INTEGER REFERENCES users(id);
