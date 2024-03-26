const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

//conexao com o banco de dados
const db = mysql.createPool ({
    host: 'localhost',
    user: 'root',
    password: 'BBq123vinicius6326015!',
    database: 'crudgames',
});

/* 
Test Comunicação com o banco de dados
app.get('/', (req, res) => {
    
    let SQL = 'INSERT INTO games (name, cost, category) VALUES ("The Sims", 130, "Fantasia")';

    db.query(SQL, (err, result) => {
            console.log(err);

    });
}); 
*/

app.use(cors());
app.use(express.json());

//rota para inserir valores no banco de dados
app.post('/register', (req, res) => {
    const name = req.body.name;
    const cost = req.body.cost;
    const category = req.body.category;

    let SQL = 'INSERT INTO games (name, cost, category) VALUES (?,?,?)';
    db.query(SQL, [name, cost, category], (err, result) => {
            console.log(err);

    });

})

//rota para pegar os valores do banco de dados
app.get('/getCards', (req, res) => {
    let SQL = 'SELECT * FROM games';

    db.query(SQL, (err, result) => {
        if(err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
})

app.put('/edit', (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const cost = req.body.cost;
    const category = req.body.category;

    let SQL = 'UPDATE games SET name = ?, cost = ?, category = ? WHERE idgames = ?';

    db.query(SQL, [name, cost, category, id], (err, result) => {
        if(err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });

})

app.delete('/delete:id', (req, res) => {
  const id = req.params.id;

  let SQL = 'DELETE FROM games WHERE idgames = ?';
  db.query(SQL, [id], (err, result) => {
    if(err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});


app.listen(3001, () => {
  console.log('Server running on port 3001');
});