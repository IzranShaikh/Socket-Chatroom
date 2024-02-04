const express = require('express');
const app = express();
const { Server } = require('socket.io');
const cors = require('cors');
require('dotenv').config();
const http = require('http');

const server = http.createServer(app);
app.use(cors());
const io = new Server(server, {
    cors: {
        origin: process.env.FRONTENDURL,
        method: ["GET", "POST"],
    }
});

//user joined
io.on('connection', (socket) => {
    console.log("User joined : " + socket.id);

    //if a room is made
    socket.on("makeroom", (roomid) => {
        //join that room
        socket.join(roomid);
        console.log("User " + socket.id + " joined room " + roomid);
    })

    //send message to specific room
    socket.on('messagetransfer', (data) => {
        socket.to(data.room).emit("recievemessage", { message: data.message, username: data.username, time: data.time });
    })

    //user left
    socket.on('disconnect', () => {
        console.log("User left : " + socket.id);
    });
});


const port = process.env.PORT;
server.listen(port, () => { console.log("Server running at " + port) });