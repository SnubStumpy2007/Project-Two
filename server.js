const express = require('express');
const sequelize = require('./config/connection.js');
const mysql = require('mysql12');
const routes = require('./routes');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = sequelize.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: '',
    database: 'blog_db'
  },
  console.log(`Connected to the blog_db database.`)
);

// Routes
app.use(routes);

// Connect to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});

// Query database
db.query('SELECT * FROM userAccount', function (err, results) {
  console.log(results);
});

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});