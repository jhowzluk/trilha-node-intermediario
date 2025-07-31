const fs = require('fs');
const path = require('path'); 

const nomeDoArquivo = 'texto.txt';

const caminhoDoArquivo = path.join(__dirname, nomeDoArquivo);

console.log(`Tentando ler o arquivo: ${caminhoDoArquivo}`);

fs.readFile(caminhoDoArquivo, 'utf8', (err, data) => {

  if (err) {
    console.error('Ocorreu um erro ao ler o arquivo:', err.message);
    return; 
  }

  console.log('\nConteúdo do arquivo:');
  console.log(data);
});

console.log('Solicitação de leitura de arquivo enviada. Aguardando...');