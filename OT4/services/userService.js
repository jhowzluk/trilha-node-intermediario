const connection = require("../app").connection;

exports.getAllUsers = (callback) => {
  connection.query("SELECT * FROM usuarios", callback);
};

exports.createUser = (nome, email, callback) => {
  const query = "INSERT INTO usuarios (nome, email) VALUES (?, ?)";
  connection.query(query, [nome, email], callback);
};

exports.updateUser = (id, nome, callback) => {
  const query = "UPDATE usuarios SET nome = ? WHERE id = ?";
  connection.query(query, [nome, id], callback);
};

exports.deleteUser = (id, callback) => {
  const query = "DELETE FROM usuarios WHERE id = ?";
  connection.query(query, [id], callback);
};

exports.getUserByName = (nome, callback) => {
  const query = "SELECT * FROM usuarios WHERE nome = ?";
  connection.query(query, [nome], callback);
};
