const Usuario = require('../models/usuario');
const schemaUsuario = require('../validators/validator');

exports.listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.buscarTodos();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar usuários.' });
  }
};

exports.listarUsuariosPaginacao = async (req, res) => {
  const { page = 1, limit = 5 } = req.query;
  const offset = (page - 1) * limit;

  try {
    const usuarios = await Usuario.buscarComPaginacao(limit, offset);
    res.status(200).json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao buscar usuários com paginação.' });
  }
};

exports.filtrarUsuariosPorNome = async (req, res) => {
  const { nome } = req.query;

  if (!nome) {
    return res.status(400).json({ erro: 'Parâmetro "nome" é obrigatório.' });
  }

  try {
    const usuarios = await Usuario.filtrarPorNome(nome);
    res.status(200).json(usuarios);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao buscar usuários por nome.' });
  }
};

exports.cadastrarUsuario = async (req, res) => {
  const { error } = schemaUsuario.validate(req.body);

  if (error) {
    return res.status(400).json({ erro: error.details[0].message });
  }

  try {
    const novoUsuario = await Usuario.inserir(req.body);
    res.status(201).json(novoUsuario);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao cadastrar usuário.' });
  }
};

exports.atualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const { error } = schemaUsuario.validate(req.body);

  if (error) {
    return res.status(400).json({ erro: error.details[0].message });
  }

  try {
    await Usuario.atualizar(id, req.body);
    res.status(200).json({ mensagem: 'Usuário atualizado com sucesso.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao atualizar usuário.' });
  }
};

exports.deletarUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    await Usuario.deletar(id);
    res.status(200).json({ mensagem: 'Usuário deletado com sucesso.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao deletar usuário.' });
  }
};
