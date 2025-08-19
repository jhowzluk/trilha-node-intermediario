const express = require('express');
const cookieparser = require('cookie-parser');

const app = express();
const PORT = 3000;

app.use(cookieparser());

app.get(`/set-cookie`, (req, res) => {
    const userId = `user_id_123`;

    res.cookie(`token_seguro`, userId, {
        maxAge: 3600000,
        httpOnly: true,
        secure: false, // ATENÇÃO: Definido como 'false' para testes em HTTP local. EM PRODUÇÃO, DEVE SER SEMPRE 'true' E EXIGE HTTPS.
        sameSite: 'lax'
    })

    res.cookie('token_inseguro', 'dado_visivel_js', {
        maxAge: 3600000,
        httpOnly: false, // Pode ser acessado por JavaScript
        secure: false,
        sameSite: 'Lax'
    })

    res.send('Cookies definidos. Verifique o console do navegador e as ferramentas de desenvolvedor.');
})

app.get('/read-cookies', (req, res) => {
    const cookies = req.cookies;
    console.log('Cookies recebidos pelo servidor:', cookies);
    res.json({ message: 'Cookies recebidos no servidor', cookies: cookies });
});

app.get('/', (req, res) => {
    res.send('Servidor de cookies seguros. Acesse /set-cookie para definir cookies.');
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    console.log('Acesse http://localhost:3000/set-cookie para testar.');
});