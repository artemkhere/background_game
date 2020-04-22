import express from 'express';
import http from 'http';
import socketIO from 'socket.io';

import index from './routes/index';

const port = process.env.PORT || 6969;
const app = express();

app.use(index);
const server = http.createServer(app);

const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('New client connected');

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
