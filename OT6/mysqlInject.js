const express = require("express");
const bodyparser = require("body-parser");
const mysql = require("mysql2");
require("dotenv").config();
const bcrypt = require("bcrypt");

const session = require('express-session');

const PORT = 3000;
const app = express();

app.use(session({ 
    secret: 'senha',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000, httpOnly: true, secure: false }
}));

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

connection.connect((err) => {
  if (err) {
    console.error(`Erro ao se conectar no banco`);
    process.exit(1);
  }
  console.log(`conectado ao banco`);
});

app.use(bodyparser.json());

app.post(`/register`, async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).send(`Senha e usuario obrigatorios`);
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = "INSERT INTO usuarios2 (username, password) VALUES (?, ?)";
    connection.query(query, [username, hashedPassword], (err, results) => {
      if (err) {
        console.error("Erro ao registrar usuário:", err.message);
        if (err.errno === 1062) {
          return res
            .status(409)
            .json({ message: "Nome de usuário já existe." });
        }
        return res
          .status(500)
          .json({ message: "Erro no servidor ao registrar usuário." });
      }
      res.status(201).json({ message: "Usuário registrado com sucesso!" });
    });
  } catch (error) {
    console.error(`Erro ao gerar hash da senha: ${error}`);
    res.status(500).json({ message: "Erro no servidor ao registrar usuário." });
  }
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ message: "Usuario e senha obrigatorios" });
  }
  const query = "SELECT * FROM usuarios2 WHERE username = ?";
  connection.query(query, [username], async (err, results) => {
    if (err) {
      console.error("Erro ao buscar usuário para login:", err.message);
      return res
        .status(500)
        .json({ message: "Erro no servidor durante o login." });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: "Credenciais inválidas." });
    }

    const user = results[0];

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      req.session.username = username;
      return res.json({ message: "Login efetuado com sucesso!" });
    } else {
      return res.status(401).json({ message: "Credenciais inválidas." });
    }
  });
});

function verificaSessao(req, res, next) {
  if (req.session.username) {
    return next();
  }

  res.status(401).json({ message: "Login necessario" });
}

app.get("/protegido", verificaSessao, (req, res) => {
  res.json({ message: `${req.session.username} logado com sucesso` });
});

app.post("/logout", (req, res) => {
  req.session.destroy();
  res.json({ message: "Logout realizado" });
});

app.post("/comentario", verificaSessao, (req, res) => {
  const { comentario } = req.body;
  res.json({ message: `Comentário recebido: ${comentario}` });
});

app.listen(PORT, () =>
  console.log("Servidor com sessão rodando em http://localhost:" + PORT)
);
