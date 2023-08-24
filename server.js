const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(__dirname));

let onlineUsers = [];

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('user joined', (username) => {
        socket.username = username;
        onlineUsers.push(username);
    });

    socket.on('send message', (data) => {
        data.id = socket.id;
        io.emit('receive message', data);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
        onlineUsers = onlineUsers.filter(user => user !== socket.username);
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
