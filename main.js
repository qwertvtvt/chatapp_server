const fs = require("fs");
const path = require("path");
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const app = express();
const server = http.createServer(app);
const bodyParser = require("body-parser");
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});
const knex = require("knex")(require("./knexfile")["development"]);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/www"));

const endpointsPath = path.join(__dirname, "endpoints");
fs.readdirSync(endpointsPath).forEach(function(file) {
    const route = require(path.join(endpointsPath, file));
    app.use("/", route);
});

io.on("connection", function(socket) {
    socket.on("join_room", ({ roomId, username }) => {
        socket.join(roomId);
        knex("chats").insert({
            roomId,
            username: "System",
            message: `${username}が参加しました`,
            system: true,
            post_at: Date.now()
        }).then(function() {
            io.to(roomId).emit("message", {
                roomId: roomId,
                system: true,
                username: "System",
                message: `${username}が参加しました`,
                post_at: Date.now()
            });
        });
    });

    socket.on("leave_room", ({ roomId, username }) => {
        socket.leave(roomId);

        knex("chats").insert({
            roomId,
            username: "System",
            message: `${username}が退出しました`,
            system: true,
            post_at: Date.now()
        }).then(() => {
            io.to(roomId).emit("message", {
                roomId,
                system: true,
                username: "System",
                message: `${username}が退出しました`,
                post_at: Date.now()
            });
        });
    });

    socket.on("send", ({roomId, username, message}) => {
        knex("chats").insert({
            roomId,
            username,
            message,
            system: false,
            post_at: Date.now()
        }).then(function() {
            io.to(roomId).emit("message", {
                roomId: roomId,
                system: false,
                username,
                message,
                post_at: Date.now()
            });
        });
    });
});

server.listen(3000, function() {
    console.log("listening on *:3000");
});