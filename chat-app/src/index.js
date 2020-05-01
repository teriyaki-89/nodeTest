const path = require("path");
const http = require("http");
const express = require("express");
const scoketio = require("socket.io");
const Filter = require("bad-words");

const app = express();
const server = http.createServer(app);
const io = scoketio(server);

const port = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publicDirectoryPath));

io.on("connection", (socket) => {
    socket.emit("welcome", "Welcome to chat app from server");

    socket.broadcast.emit("message", "a new user has joined");

    socket.on("sendMessage", (message, callback) => {
        const filter = new Filter();
        if (filter.isProfane(message)) {
            return callback("Profanity is not allowed");
        }
        io.emit("message", message);
        callback();
    });

    socket.on("disconnect", () => {
        io.emit("message", "a user has left");
    });
});

server.listen(port, () => {
    console.log(`app is listening on a port:  ${port}`);
});
