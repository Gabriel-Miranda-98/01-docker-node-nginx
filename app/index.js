import express from "express";
import mysql from 'mysql2'
const app = express();
const port=3000
const config={
  host:'db',
  user:'root',
  port:3306,
  password:'root',
  database:'nodedb'
}

const connect = mysql.createConnection(config)
const sql =`insert into people(name) values('Gabriel')`;
const table ="CREATE TABLE IF NOT EXISTS people (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255))"
connect.query(table)
connect.commit()
connect.query(sql)
connect.commit()
app.get('/', (req, res) => {

connect.query('SELECT id,name FROM people', (error, results) => {
  if (error) {
    console.error('Erro ao obter os nomes do banco de dados:', error);
    res.sendStatus(500);
  } else {
    const nomes = results.map((row) => {
      return row
    });
    res.send('<h1>Full Cycle Rocks!</h1>'+ JSON.stringify(nomes))
  }
})
})


process.on('exit', () => {
  connect.end();
});

process.on('SIGINT', () => {
  server.close(() => {
    console.log('Servidor Node.js encerrado');
    process.exit();
  });
});


app.listen(port,()=>{
  console.log("Rodando na porta "+ port)
})


