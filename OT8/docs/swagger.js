const swaggerJsDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API Usuários - OT8',
    version: '1.0.0',
    description: 'Documentação da API de usuários com Node.js, Express e MySQL',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Servidor local'
    }
  ]
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'], // Caminho dos arquivos com comentários JSDoc
};

module.exports = swaggerJsDoc(options);
