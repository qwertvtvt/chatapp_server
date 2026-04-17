const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

app.use(express.static(__dirname + "/www"));

io.on("connection", function(socket) {
    
});

server.listen(3000, function() {
    console.log("listening on *:3000");
});