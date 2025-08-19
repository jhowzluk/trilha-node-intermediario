const http = require('http'); 

const server = http.createServer((req, res) => {

    switch (req.url) {
        case '/':
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain'); 
            res.end(`pagina inicial`)
            break;

        case '/sobre':
           
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.end(`Pagina sobre a equipe`);
            break;

        case '/contato':
            
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.end('contato@contatogmail.com');
            break;

        case '/api/dados':
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            const dados = {
                id: 1,
                nome: 'Exemplo de Dado',
                status: 'ativo'
            };
            res.end(JSON.stringify(dados));
            break;

        default:
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/plain');
            res.end(`rota invalida`);
            break;
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Servidor de rotas rodando em http://localhost:${PORT}`);
    console.log('Tente acessar:');
    console.log(` - http://localhost:${PORT}/`);
    console.log(` - http://localhost:${PORT}/sobre`);
    console.log(` - http://localhost:${PORT}/contato`);
    console.log(` - http://localhost:${PORT}/api/dados`);
    console.log(` - http://localhost:${PORT}/qualquer-outra-coisa`);
});