CREATE DATABASE IF NOT EXISTS projeto_node;
USE projeto_node;

CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL
);

-- Opcional: Inserir alguns dados para teste
INSERT INTO usuarios (nome, email) VALUES ('Alice', 'alice@example.com');
INSERT INTO usuarios (nome, email) VALUES ('Bob', 'bob@example.com');