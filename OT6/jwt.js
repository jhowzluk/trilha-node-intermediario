const express = require('express')
const jwt = require('jsonwebtoken')
const bodyparser = require('body-parser')

const app = express();

app.use(bodyparser.json());

const JWT_KEY = 'senha';


app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (password === '1234') {
        const token = jwt.sign({ username }, JWT_KEY, { expiresIn: '1h' })
        return res.json(token);
    }

    res.status(401).json({ message: 'Credenciais invalidas' })
})

function autenticarToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, JWT_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    })
}

app.get('/protegido', autenticarToken, (req, res) => {
    res.json({ message: `Olá ${req.user.username}, acesso autorizado!` });
});

app.listen(3000, () => console.log('Servidor rodando em http://localhost:3000'));