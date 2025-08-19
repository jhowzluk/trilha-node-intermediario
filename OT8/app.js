const express = require('express');
const app = express();

const usuarioRoutes = require('./routes/routes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');
const logger = require('./middleware/logger')

app.use(express.json());
app.use(logger);
app.use(usuarioRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(3000, () => {
  console.log('Servidor rodando na porta http://localhost:3000/');
});
