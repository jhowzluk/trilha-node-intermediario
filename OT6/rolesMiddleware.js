const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const mysql = require("mysql2");
require("dotenv").config();

const app = express();
const PORT = 3000;

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

connection.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err.message);
    process.exit(1);
  }
  console.log("Conectado ao banco de dados MySQL.");
});

app.use(cookieParser());
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000, httpOnly: true, secure: false },
  })
);

function verificaSessao(req, res, next) {
  if (req.session.username) {
    return next();
  }
  res.status(401).json({ message: "Login necessário." });
}

function verificaRole(rolesPermitidos) {
  return (req, res, next) => {
    if (!req.session.username) {
      return res
        .status(401)
        .json({ message: "Login necessário para acessar este recurso." });
    }

    const username = req.session.username;

    const query = "SELECT role FROM usuariosRoles WHERE username = ?";
    connection.query(query, [username], (err, results) => {
      if (err) {
        console.error("Erro ao buscar role do usuário:", err.message);
        return res.status(500).json({ message: "Erro interno do servidor." });
      }
      if (results.length === 0) {
        return res
          .status(403)
          .json({ message: "Acesso negado: Papel de usuário não encontrado." });
      }

      const userRole = results[0].role;

      if (rolesPermitidos.includes(userRole)) {
        req.userRole = userRole;
        return next();
      } else {
        return res
          .status(403)
          .json({
            message: `Acesso negado: Você não tem permissão (${userRole}).`,
          });
      }
    });
  };
}

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Nome de usuário e senha são obrigatórios." });
  }

  const query =
    "SELECT username, password FROM usuariosRoles WHERE username = ?";
  connection.query(query, [username], async (err, results) => {
    if (err) {
      console.error("Erro ao buscar usuário para login:", err.message);
      return res.status(500).json({ message: "Erro interno do servidor." });
    }
    if (results.length === 0 || results[0].password !== password) {
      return res.status(401).json({ message: "Credenciais inválidas." });
    }

    req.session.username = username;
    res.json({ message: "Login efetuado com sucesso!" });
  });
});

app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Erro ao destruir sessão:", err);
      return res.status(500).json({ message: "Erro ao fazer logout." });
    }
    res.json({ message: "Logout realizado com sucesso!" });
  });
});

app.get("/admin", verificaSessao, verificaRole(["admin"]), (req, res) => {
  res.json({
    message: `Bem-vindo ao painel de administração`,
  });
});

app.get(
  "/editor",
  verificaSessao,
  verificaRole(["admin", "editor"]),
  (req, res) => {
    res.json({
      message: `Bem-vindo ao painel de edição`,
    });
  }
);

app.get(
  "/user",
  verificaSessao,
  verificaRole(["admin", "user", "editor", "manager"]),
  (req, res) => {
    res.json({
      message: `Bem-vindo usuario`,
    });
  }
);

app.get("/", (req, res) => {
  res.send(
    "Sem autorizaçao necessaria"
  );
});

app.listen(PORT, () => {
  console.log(`Servidor de roles rodando em http://localhost:${PORT}`);
});
