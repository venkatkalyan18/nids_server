const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();


app.use(cors());
app.use(express.json());


const db = mysql.createConnection({
  host: 'host',      
  user: 'user',           
  password: 'password',   
  database: 'database',  
  port: 3306,               
  connectTimeout: 10000,
});

app.get('/api/data', (req, res) => {
  const query = 'SELECT * FROM packet_data'; 
  db.query(query, (err, results) => {
    if (err) {
      console.error('Database query failed:', err);
      res.status(500).json({ message: 'Database query failed'});
    } else {
      res.status(200).json(results);
    }
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
