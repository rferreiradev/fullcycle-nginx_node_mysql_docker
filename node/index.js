const express = require('express');
const app = express();
const port = 3000;

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb',
};

app.get('/', (req, res) => {

    const mysql = require('mysql');
    const connection = mysql.createConnection(config)

    const sql = `INSERT INTO people(name) values('Aluno FullCycle')`
    connection.query(sql)

    const sql2 = `SELECT name FROM people`;  
  
    connection.query(sql2, (error, results, fields) => {
      if (error) {
        throw error
      };
      
      let html = '<h1>Full Cycle Rocks!</h1><table>';
      html += '<tr><th>Nome</th></tr>';
      for(let people of results) {      
        html += `<tr><td>${people.name}</td></tr>`;
      }
  
      html += '</table>';    
      res.send(html);
    });   
    connection.end();  
})

app.listen(port, ()=> {
    console.log('Rodando na porta '+port)
})