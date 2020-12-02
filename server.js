const express = require('express');
const socket = require('socket.io');
const mongoose = require('mongoose');
const path = require('path');
const apiRoutes = require('./routes/api');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(apiRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));

  // catch all route for react-router
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
  });
}

const server = app.listen(process.env.PORT || 3001, () => {
  console.log(`server is running on port 3001`);
});

const io = socket(server);

//create separate chat rooms using project id
io.on('connection', (socket) => {
  socket.on('room', (room) => {
    socket.join(room);
    socket.in(room).on('SEND_MESSAGE', (message) => {
      io.sockets.emit('RECEIVE_MESSAGE', message);
    });
    socket.in(room).on('TASK_CHANGE', (data) => {
      io.sockets.emit('UPDATE_PROJECT', data);
    });
  });
});
