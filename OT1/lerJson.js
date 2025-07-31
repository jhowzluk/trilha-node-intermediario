const fs = require('fs');
const path = require('path'); 

const nomeDoArquivoJson = 'usuario.json';

const caminhoDoArquivoJson = path.join(__dirname, nomeDoArquivoJson);

console.log(`Tentando ler o arquivo JSON: ${caminhoDoArquivoJson}`);

fs.readFile(caminhoDoArquivoJson, 'utf8', (err, data) => {
  if (err) {
    console.error('Ocorreu um erro ao ler o arquivo JSON:', err.message);
    return;
  }

  try {
    const usuario = JSON.parse(data);

    console.log('\nConteúdo do arquivo JSON (objeto JavaScript):');
    console.log(usuario);

    console.log('\nInformações do Usuário:');
    console.log(`Nome: ${usuario.nome}`);
    console.log(`Idade: ${usuario.idade}`);
    console.log(`Email: ${usuario.email}`);
    console.log(`Primeiro interesse: ${usuario.interesses[0]}`);
    console.log(`Cidade do endereço: ${usuario.endereco.cidade}`);

  } catch (parseError) {
    console.error('Erro ao analisar o conteúdo JSON:', parseError.message);
  }
});

console.log('Solicitação de leitura do arquivo JSON enviada. Aguardando...');