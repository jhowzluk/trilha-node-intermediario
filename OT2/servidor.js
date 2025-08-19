const http = require('http');
const { CLIENT_RENEG_LIMIT } = require('tls');

const server = http.createServer((req, res) => {
    res.statusCode  = 200;
    res.setHeader('Content-Type', 'text/plain');

    res.end(`Bem vindo ao Node.js`);
})

const port = 3000;

server.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:3000`)
})