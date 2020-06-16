import express from 'express';
import http from 'http';
import socketIO from 'socket.io';
import cors from 'cors';
import path from 'path';
require('dotenv').config();

import index from './routes/index';
import setupSocketApi from './api/socket/setup.js';

const port = process.env.PORT || 80;
const app = express();

// CORS - currently allow all requests
// needs to change to only let frontend to hit it
app.use(cors());

// parsing json
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// serve frontend files
app.use(express.static(path.join(__dirname, 'client/build')));

// routes
app.use(index);
const server = http.createServer(app);

// socket support
const io = socketIO(server);

io.on('connection', (socket) => { setupSocketApi(socket); });

server.listen(port, () => console.log(`Listening on port ${port}`));
