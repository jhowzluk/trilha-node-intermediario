const axios = require('axios');

const apiUrl = 'https://jsonplaceholder.typicode.com/posts/1';

axios.get(apiUrl)
  .then(response => {
    console.log('Dados recebidos:');
    console.log(response.data);
    console.log('\nStatus da requisição:', response.status);
  })
  .catch(error => {
    console.error('Ocorreu um erro ao fazer a requisição:', error.message);
    if (error.response) {
      console.error('Status do erro:', error.response.status);
      console.error('Dados do erro:', error.response.data);
    } else if (error.request) {
      console.error('Nenhuma resposta recebida para a requisição.');
    } else {
      console.error('Erro de configuração da requisição:', error.message);
    }
  });

console.log('Fazendo requisição para', apiUrl, '...');