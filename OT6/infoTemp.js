const express = require('express');
const bodyparser = require('body-parser');
const session = require('express-session');

const { setServers } = require('dns');
const { serialize } = require('v8');
const cors = require('cors');
;

const app = express();

const origemPermitida = 'http://localhost:3000';


app.use(cors({
    origin: origemPermitida,
    credentials: true
}))

app.use(bodyparser.json());

app.use(session({
    secret: 'senha',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 }
}))


app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (password === '1234') {
        req.session.username = username;
        return res.json({ message: 'Login efetuado com sucesso' })
    }

    res.status(401).json({ message: 'Credenciais inválidas' })
})

function verificaSessao(req, res, next) {
    if (req.session.username) {
        return next()
    }

    res.status(401).json({ message: 'Login necessario' })
}

app.get('/protegido', verificaSessao, (req, res) => {
    res.json({ message: `${req.session.username} logado com sucesso` })
})

app.post('/logout', (req, res) => {
    req.session.destroy();
    res.json({ message: 'Logout realizado' })
})

app.post('/comentario', verificaSessao, (req, res) => {
    const { comentario } = req.body;
    res.json({ message: `Comentário recebido: ${comentario}` });
});

app.listen(3000, () => console.log('Servidor com sessão rodando em http://localhost:3000'));