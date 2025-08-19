const express = require('express');
const bodyparser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const csrf = require('csurf');

const app = express();
const PORT = 3000;
const IP_ADDRESS = '127.0.0.1'

const origemPermitida = `http://${IP_ADDRESS}:5500`;

app.use(cors({
    origin: origemPermitida,
    credentials: true
}));

app.use(bodyparser.json());
app.use(cookieParser());

app.use(session({
    secret: 'senha',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 300000,
        httpOnly: true,
        secure: false, // Mantenha false para HTTP local
        sameSite: 'None' // <-- ALTERADO PARA 'None' para teste local
    }
}));

const csrfProtection = csrf({ cookie: true });

app.get('/csrf', csrfProtection, (req, res) => {
    const token = req.csrfToken();
    res
        .cookie('XSRF-TOKEN', token, {
            httpOnly: true,
            secure: false, // Mantenha false para HTTP local
            sameSite: 'None' // <-- ALTERADO PARA 'None' para teste local
        })
        .json({ csrfToken: token });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    console.log('Recebida requisição de login para:', username); // DEBUG
    console.log('Sessão antes do login:', req.session.username); // DEBUG

    if (password === '1234') {
        req.session.username = username;
        console.log('req.session.username definido para:', req.session.username); // DEBUG
        req.session.save((err) => {
            if (err) {
                console.error('Erro ao salvar a sessão:', err); // DEBUG
                return res.status(500).json({ message: 'Erro interno do servidor.' });
            }
            console.log('Sessão salva. Enviando resposta JSON.'); // DEBUG
            return res.json({ message: 'Login efetuado com sucesso' });
        });
    } else {
        console.log('Credenciais inválidas para:', username); // DEBUG
        res.status(401).json({ message: 'Credenciais inválidas' });
    }
});

function verificaSessao(req, res, next) {
    console.log('Verificando sessão. req.session.username:', req.session.username); // DEBUG
    if (req.session.username) {
        return next();
    }
    res.status(401).json({ message: 'Login necessario' });
}

app.get('/protegido', verificaSessao, csrfProtection, (req, res) => {
    res.json({ message: `${req.session.username} logado com sucesso` });
});

app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Erro ao fazer logout:', err);
            return res.status(500).json({ message: 'Erro ao fazer logout.' });
        }
        res.json({ message: 'Logout realizado' });
    });
});

app.post('/comentario', verificaSessao, csrfProtection, (req, res) => {
    const { comentario } = req.body;
    res.json({ message: `Comentário recebido: ${comentario}` });
});

app.use((err, req, res, next) => {
    if (err.code === 'EBADCSRFTOKEN') {
        console.error('CSRF Token Error (Server Log):', err.message);
        console.error('Request URL:', req.originalUrl);
        console.error('Request Method:', req.method);
        console.error('Request Headers:', req.headers);
        console.error('Request Cookies (from cookieParser):', req.cookies);
        console.error('X-CSRF-Token Header (Client Sent):', req.headers['x-csrf-token']);
        return res.status(403).json({ message: 'Token CSRF inválido ou ausente.' });
    }
    next(err);
});

app.listen(PORT, IP_ADDRESS, () => console.log(`Servidor com sessão rodando em http://${IP_ADDRESS}:${PORT}`));