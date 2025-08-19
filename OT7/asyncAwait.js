const { json } = require("body-parser");
const express = require("express");
const fetch = require('node-fetch');
const { get } = require("http");

const app = express();

app.use(express.json());

const cepFixo = '89222-530'; 

app.get('/cep', async (req, res) => {
    try {
        const dadosDoCep = await getCep(cepFixo); 
        return res.json(dadosDoCep);    
    } catch (error) {
        console.error('Erro na rota /cep:', error.message);
        return res.status(500).json({ error: 'Erro interno ao buscar CEP.' });
    }
})

async function getCep(buscaCep) {
    try{
        const urlCep = `https://viacep.com.br/ws/${buscaCep}/json/`;
        const response = await fetch(urlCep);
        
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status} - ${response.statusText}`);
        }

        return await response.json();

    } catch(err){
        console.error('Erro ao pegar cep'+err)
        throw err;
    }
}

app.listen(3000, (req, res) => {
    console.log('Servidor rodando na porta http://localhost:3000')
})
