const fs = require('fs');

const nomeArq = 'texto.txt';
const conteudoInicial = 'Principal teste teste';
const conteudoAtualizado = 'Atualizado teste teste';

console.log('--- Iniciando operações SÍNCRONAS ---');

try {
    fs.writeFileSync(nomeArq, conteudoInicial)
    console.log(`Arquivo ${nomeArq} criado`);

    const conteudoLido = fs.readFileSync(nomeArq, 'utf8');
    console.log(`Conteúdo lido: ${conteudoLido}`)
} catch(err) {
    console.log(`Erro: ${err}`)
}

console.log('--- Iniciando operações ASSÍNCRONAS ---');

fs.writeFile(nomeArq, conteudoAtualizado, (err) => {
    if(err){
        console.log(`erro: ${err}`)
        return;
    }
    console.log(`conteúdo atualizado.`)
})

fs.readFile(nomeArq, 'utf-8', (err, data) => {
    if(err){
        console.log(`erro: ${err}`)
        return;
    }

    console.log(`conteúdo lido: ${data}`)
})

