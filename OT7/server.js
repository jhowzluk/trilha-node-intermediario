const { Socket } = require("dgram");
const express = require("express");
const http = require("http");
const { connect } = require("http2");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const PORT = 3000;

const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/client.html");
});

io.on("connection", (socket) => {
  console.log(`[Servidor Socket.io] Um novo cliente conectado: ${socket.id}`);

  socket.emit("message", "Bem-vindo ao chat! Você se conectou.");
  socket.broadcast.emit(
    "message",
    `Usuário ${socket.id.substring(0, 4)} entrou no chat.`
  );

  socket.on("chatMessage", (msg) => {
    console.log(
      `[Servidor Socket.io] Mensagem recebida de ${socket.id.substring(
        0,
        4
      )}: "${msg}"`
    );

    io.emit("message", `[${socket.id.substring(0, 4)}]: ${msg}`);
  });

  socket.on("disconnect", () => {
    console.log(`[Servidor Socket.io] Cliente desconectado: ${socket.id}`);

    io.emit("message", `Usuário ${socket.id.substring(0, 4)} saiu do chat.`);
  });
});

server.listen(PORT, () => {
  console.log(`Servidor Socket.io e Express ouvindo na porta ${PORT}`);
  console.log(`Acesse http://localhost:${PORT} no seu navegador.`);
});
