const axios = require('axios')
const hbs = require('handlebars')
const express = require('express');
const app = new express();
const mysql = require('mysql2');
const PORT = 3000;

const connection = mysql.createConnection({
  host: "localhost",
  user: 'root',
  password: 'root',
  database: 'projeto_node',
  port: 3307
});
exports.connection = connection;

connection.connect((err) => {
  if (err) {
    console.error("Erro ao se conectar ao banco: ", err);
    process.exit(1);
  }
  console.log("Conectado ao banco");
});

app.set('view engine', 'hbs');

app.use(express.static('public'));


app.get('/react', (req, res) => {
  res.render('react-page', { title: 'Página com React (SSR + CSR)' });
});


app.get('/', (req, res) => {
  connection.query('SELECT * FROM usuarios', (err, results) => {
    if (err) throw err;
    res.render('index', { usuarios: results, title: 'SSR com Node.js' })
  })
})

app.get('/posts', async (req, res) => {
  try{
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
    const posts = response.data.slice(0, 10);

    res.render('posts', {
      title: 'Ultimos posts da api',
      posts: posts
    })
  } catch(err){
    console.error('Erro ao buscar dados na api', err)
    res.status(500).send('Erro ao buscar dados na api')
  }
})

app.get('/about', (req, res) => {
  res.render('about', { title: 'Sobre o Site', descricao: 'Esse site foi feito com handlebars' });
})

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta http://localhost:${PORT}`);
})