const fs = require('fs');
const arquivoInexistente = '32131.txt'

console.log(`tentando ler arquivo inexistente: ${arquivoInexistente}`)

try{

    const conteudo = fs.readFileSync(arquivoInexistente, 'utf-8');
    console.log(`Conteudo do arquivo: ${conteudo}`)
} catch(err){
    console.log(`nao foi possivel ler o arquivo: ${err}`)
}