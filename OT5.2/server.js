const express = require('express');
const mysql = require('mysql2');
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', './views');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'projeto_node',
    port: 3307
});

connection.connect((err => {
    if (err) {
        console.error('Erro ao se conectar ao banco: ', err.message);
        process.exit(1);
    }
    console.log("Conectado ao banco");
}))

app.use((req, res, next) => {
    connection.query('SELECT * FROM usuarios', (err, result) => {
        if (err) {
            console.error('Erro ao carregar usuarios do banco')
            res.locals.usuarios = [];
        } else {
            res.locals.usuarios = result;
        }
        next();
    })
})

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index', { title: 'Lista de exercicios 2 OT 5' })
})

app.get('/usuarios', (req, res) => {
    res.render('usuarios', { title: 'Lista de usuarios' })
});

app.get('/form', (req, res) => {
    res.render('form', { title: 'Cadastrar Usuario', mensagemErro: null })
})

app.post('/form', (req, res) => {
    const { nome, email } = req.body;

    if (!nome || !email) {
        return res.status(400).render('erro', {
            title: 'Erro no Cadastro',
            mensagemErro: 'Nome e e-mail são obrigatórios.', nome, email
        });
    }

    const sql = 'INSERT INTO usuarios (nome, email) VALUES (?, ?)';

    connection.query(sql, [nome, email], (err, results) => {
        if (err) {
            console.error('Erro ao inserir usuario: ', err.message)
            return res.status(500).render('erro', {
                title: 'Erro no servidor',
                mensagemErro: 'Erro ao inserir usuario no banco.', nome, email
            });
        }
        return res.redirect('/usuarios')
    })
})


app.listen(PORT, () => {
    console.log(`Servidor rodando na porta: http://localhost:${PORT}`);
})

