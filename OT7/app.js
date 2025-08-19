const express = require('express');
const app = express();
const PORT = 3001; 

app.get('/', (req, res) => {
    console.log(`[App ${process.pid}] Requisição recebida.`);
    res.send(`Olá do aplicativo PM2! Processo ID: ${process.pid}`);
});

app.listen(PORT, () => {
    console.log(`[App ${process.pid}] Aplicativo rodando na porta ${PORT}`);
    console.log(`Acesse http://localhost:${PORT}`);
});