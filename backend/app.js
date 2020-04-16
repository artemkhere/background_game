import express from 'express';
import http from 'http';
import socketIO from 'socket.io';
import axios from 'axios';

import index from './routes/index';

const port = process.env.PORT || 6969;
const app = express();

app.use(index);
const server = http.createServer(app);

const io = socketIO(server);

// app.get('/', (req, res) => res.send('Hello World!'));
// app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

io.on("connection", (socket) => {
  console.log("New client connected");
  // console.log(socket);
  // setInterval(() => getApiAndEmit(socket), 10000);
  socket.emit("FromAPI", "You connected, brah.");

  socket.on('areaClicked', (data) => {
    console.log("received click,", data);
  });

  socket.on("disconnect", () => console.log("Client disconnected"));
});

server.listen(port, () => console.log(`Listening on port ${port}`));
