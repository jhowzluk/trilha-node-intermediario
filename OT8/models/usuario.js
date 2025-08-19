const { rejects } = require('assert');
const schemaUsuario = require('../validators/validator');
const db = require('../config/database')

const Usuario = {};

Usuario.buscarTodos = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM usuarios_ot8', (err, results) =>{
            if(err) return reject(err);
            resolve(results)
        })
    })
}

Usuario.buscarComPaginacao = (limit, offset) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM usuarios_ot8 LIMIT ? OFFSET ?';
    db.query(sql, [parseInt(limit), parseInt(offset)], (err, resultados) => {
      if (err) return reject(err);
      resolve(resultados);
    });
  });
};

Usuario.filtrarPorNome = (nome) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM usuarios_ot8 WHERE nome LIKE ?';
    db.query(sql, [`%${nome}%`], (err, resultados) => {
      if (err) return reject(err);
      resolve(resultados);
    });
  });
};

Usuario.inserir = (usuario) => {
    return new Promise((resolve, reject) => {
        const { nome, email, senha}  = usuario;
        const sql = 'INSERT INTO usuarios_ot8 (nome, email, senha) VALUES (?, ?, ?)'
        db.query(sql, [nome, email, senha], (err, result) => {
            if(err) return reject(err);
            resolve({id: result.insertId, ...usuario})
        })
    })
}

Usuario.atualizar = (id, dados) => {
  return new Promise((resolve, reject) => {
    const { nome, email, senha } = dados;
    const sql = 'UPDATE usuarios_ot8 SET nome = ?, email = ?, senha = ? WHERE id = ?';
    db.query(sql, [nome, email, senha, id], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

Usuario.deletar = (id) => {
  return new Promise((resolve, reject) => {
    const sql = 'DELETE FROM usuarios_ot8 WHERE id = ?';
    db.query(sql, [id], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

module.exports = Usuario;
