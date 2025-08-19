const express = require("express");
const mysql = require("mysql2");
require("dotenv").config();
const app = express();
const PORT = 3000;

const connection = mysql.createConnection({
<<<<<<< HEAD
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: 3307 
=======
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
>>>>>>> afbf8a9a187db4c3cdcca7657bf5b38dc0e0b1e4
});
exports.connection = connection;

connection.connect((err) => {
  if (err) {
<<<<<<< HEAD
    console.error("Erro ao se conectar ao banco: ", err);
=======
    console.error("Erro ao se conectar ao banco: ", err.message);

>>>>>>> afbf8a9a187db4c3cdcca7657bf5b38dc0e0b1e4
    process.exit(1);
  }
  console.log("Conectado ao banco");
});

app.use((req, res, next) => {
  console.log(`[Middleware Log] Método: ${req.method}, URL: ${req.url}`);
  next();
});
app.use(express.json());

const userRoutes = require("./routes/userRoutes");

app.use("/users", userRoutes); 

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log(`Rotas de Usuários Disponíveis:`);
  console.log(`  GET /users (Listar todos)`);
  console.log(`  POST /users (Criar novo)`);
  console.log(`  PUT /users/:id (Atualizar por ID)`);
  console.log(`  DELETE /users/:id (Excluir por ID)`);
  console.log(`  GET /users/search?nome=... (Buscar por nome)`);
});
