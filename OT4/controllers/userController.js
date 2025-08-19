const userService = require("../services/userService");

exports.getUsers = (req, res) => {
  userService.getAllUsers((err, results) => {
    if (err) {
      console.error("Erro ao listar usuários: ", err.message);
      return res
        .status(500)
        .json({ message: "Erro no servidor ao buscar usuários." });
    }
    res.json(results);
  });
};

exports.createUser = (req, res) => {
  const { nome, email } = req.body;

  if (!nome || !email) {
    return res.status(400).json({ message: "Nome e email são obrigatórios" });
  }

  userService.createUser(nome, email, (err, result) => {
    if (err) {
      console.error(`Erro ao inserir usuário: ${err.message}`);
      if (err.errno === 1062) {
        return res.status(409).json({ message: "Email já cadastrado" });
      }
      return res
        .status(500)
        .json({ message: "Erro no servidor ao criar usuário" });
    }
    res.status(201).json({
      message: "Usuário criado com sucesso!",
      id: result.insertId,
      nome,
      email,
    });
  });
};

exports.updateUser = (req, res) => {
  const userId = req.params.id;
  const { nome } = req.body;

  if (!nome) {
    return res.status(400).json({ message: "O campo nome é obrigatório" });
  }

  userService.updateUser(userId, nome, (err, result) => {
    if (err) {
      console.error("Erro ao atualizar usuário: ", err.message);
      return res
        .status(500)
        .json({ message: "Erro no servidor ao atualizar usuário" });
    }

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: `Usuário com ID ${userId} não existe.` });
    }

    res.status(200).json({
      message: `Usuário com id ${userId} atualizado com sucesso!`,
      nomeAtualizado: nome,
    });
  });
};

exports.deleteUser = (req, res) => {
  const userId = req.params.id;

  userService.deleteUser(userId, (err, result) => {
    if (err) {
      console.error("Erro ao excluir usuário: ", err.message);
      return res
        .status(500)
        .json({ message: "Erro no servidor ao excluir usuário" });
    }

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: `Usuário com ID ${userId} não existe.` });
    }

    res
      .status(200)
      .json({ message: `Usuário com id ${userId} excluído com sucesso!` });
  });
};

exports.searchUserByName = (req, res) => {
  const nome = req.query.nome;

  if (!nome) {
    return res
      .status(400)
      .json({ message: 'O parâmetro "nome" é obrigatório para a busca.' });
  }

  userService.getUserByName(nome, (err, results) => {
    if (err) {
      console.error("Erro ao buscar usuário por nome:", err.message);
      return res
        .status(500)
        .json({ message: "Erro no servidor ao buscar usuário." });
    }

    if (results.length === 0) {
      return res
        .status(404)
        .json({ message: `Nenhum usuário encontrado com o nome: ${nome}` });
    }

    res.status(200).json(results);
  });
};
