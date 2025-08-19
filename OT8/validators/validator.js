const Joi = require('joi');

const schemaUsuario = Joi.object({
  nome: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  senha: Joi.string().min(6).required()
});

module.exports = schemaUsuario;
