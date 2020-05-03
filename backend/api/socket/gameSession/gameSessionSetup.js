import jwt from 'jsonwebtoken';

import config from '../../../config.js';
import db from '../../../dbConnection.js';

export default async function handleGameSessionSetup(socket) {
  socket.on('startGameSession', async (data) => {
    // missing data - can't determine how to proceed
    if (!data) {
      socket.disconnect(true);
      return;
    }

    const { userID, token } = data;
    let resources = 0;
    let gameState = { items: [] };
    let gameSave;

    if (userID !== 0 && token) {
      // fetch a gameSave
      const decodedToken = jwt.verify(token, config.privateKey);
      if (decodedToken && decodedToken.id && decodedToken.id === userID) {
        gameSave = await db.oneOrNone(
          "SELECT * FROM game_saves WHERE user_id = $1",
          [userID]
        );

        if (!gameSave) {
          gameSave = await db.one(`
            INSERT
            INTO game_saves(user_id, resources, game_state, created_on, last_interaction)
            VALUES($1, $2, $3, to_timestamp($4), to_timestamp($5))
            RETURNING id, resources, game_state
          `,
            [userID, 0, { items: [] }, Date.now() / 1000.0, Date.now() / 1000.0]
          );

          // update users with game save
          db.none(`
            UPDATE users
            SET game_save_id = $1
            WHERE id = $2
          `,
            [gameSave.id, userID]
          );
        } else {
          db.none(`
            UPDATE game_saves
            SET last_interaction = to_timestamp($1)
            WHERE id = $2
          `,
            [Date.now() / 1000.0, gameSave.id]
          );
        }

        resources = gameSave.resources;
        gameState = gameSave.game_state;
        socket.emit('updateGameSession', { resources, gameState });
      } else {
        socket.emit('error', { message: 'Failed authentication.' });
        socket.disconnect();
      }
    } else {
      gameSave = await db.one(`
        INSERT
        INTO game_saves(resources, game_state, created_on, last_interaction)
        VALUES($1, $2, to_timestamp($3), to_timestamp($4))
        RETURNING id, resources, game_state
      `,
        [0, { items: [] }, Date.now() / 1000.0, Date.now() / 1000.0]
      );

      resources = gameSave.resources;
      gameState = gameSave.game_state;
      socket.emit('updateGameSession', { resources, gameState });
    }

    socket.on('areaClicked', (data) => {
      resources += 1;
      socket.emit('updateGameSession', { resources, gameState });
    });

    socket.on('buyItem', (data) => {
      if (resources >= 5) {
        resources -= 5;
        gameState.items.push('New Item');
        socket.emit('updateGameSession', { resources, gameState });
      } else {
        socket.emit('operationFailed', { reason: 'Not enough resources' });
      }
    });

    socket.on('disconnect', () => {
      if (gameSave) {
        db.none(`
          UPDATE game_saves
          SET resources = $1, game_state = $2, last_interaction = to_timestamp($3)
          WHERE id = $4
        `,
          [resources, gameState, Date.now() / 1000.0, gameSave.id]
        );
      }
    });
  });

  // wait for socket.on(with_token_and_user_id)
  // verify token
  // if (token.verified) {fetch save, set game "on's"}
  // if (token.failed) {return error and drop connection}

  // or wait for socket.on(no token, but maybe user id)
  // if no token no user id -- create new game save with nothing
  // if user id -- create new game save and associate it with user id
}
