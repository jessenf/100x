const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(__dirname));

let onlineUsers = [];

const emojiMap = {
  "react": "⚛️",
  "woah": "😮",
  "hey": "👋",
  "lol": "😂",
  "like": "❤️",
  "congratulations": "🎉"
};

function replaceWithEmojis(text) {
  for (let keyword in emojiMap) {
    let regex = new RegExp(`\\b${keyword}\\b`, 'gi');
    text = text.replace(regex, emojiMap[keyword]);
  }
  return text;
}

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('user joined', (username) => {
        socket.username = username;
        onlineUsers.push(username);
    });

    socket.on('send message', (data) => {
        data.id = socket.id;

        // Replace certain words with emojis
        data.text = replaceWithEmojis(data.text);

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
