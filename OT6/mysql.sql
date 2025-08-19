CREATE TABLE usuarios2 (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE usuariosRoles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'user'
);

INSERT INTO usuariosRoles (username,password, role) VALUES ('adminUser','1234', 'admin');


INSERT INTO usuariosRoles (username,password, role) VALUES ('normalUser','1234', 'user');


INSERT INTO usuariosRoles (username,password, role) VALUES ('editorUser','1234', 'editor');