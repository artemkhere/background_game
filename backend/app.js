import express from 'express';
import http from 'http';
import socketIO from 'socket.io';
import cors from 'cors';

import index from './routes/index';

const port = process.env.PORT || 6969;
const app = express();

// CORS - currently allow all requests
// needs to change to only let frontend to hit it
app.use(cors());

// parsing json
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// routes
app.use(index);
const server = http.createServer(app);

const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('New client connected');

  // wait for socket.on(with_token_and_user_id)
  // verify token
  // if (token.verified) {fetch save, set game "on's"}
  // if (token.failed) {return error and drop connection}

  // or wait for socket.on(no token, but maybe user id)
  // if no token no user id -- create new game save with nothing
  // if user id -- create new game save and associate it with user id


  // in the future will be fetched
  let resources = 0;
  let gameState = { items: [] };

  socket.emit('updateGameSession', { resources, gameState });

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

  socket.on('disconnect', () => console.log('Client disconnected'));
});

server.listen(port, () => console.log(`Listening on port ${port}`));
