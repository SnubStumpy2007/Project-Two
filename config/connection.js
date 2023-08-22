const Sequelize = require('sequelize');
const config = require('./config.json').production; // Adjust as necessary (e.g., 'production', 'test')
require('dotenv').config()

// let sequelize;

// if (process.env.JAWSDB_URL) {
//   sequelize = new Sequelize(process.env.JAWSDB_URL);
// } else {
//   sequelize = new Sequelize(
//     process.env.DB_NAME,
//     process.env.DB_USER,
//     process.env.DB_PASSWORD,
//     {
//       host: 'localhost',
//       dialect: 'mysql',
//       port: 3306,
//     },
//   );
// }



//Use environment variables if they're defined, otherwise fallback to config.json values
const sequelize = new Sequelize(
  process.env.DB_NAME || config.database,
  process.env.DB_USER || config.username,
  process.env.DB_PASSWORD || config.password,
  {
    host: process.env.DB_HOST || config.host,
    dialect: process.env.DB_DIALECT || config.dialect,
    port: process.env.DB_PORT || 3306
  }
);
sequelize.authenticate()
  .then(() => console.log('Database connection established successfully.'))
  .catch(err => console.error('Unable to connect to the database:', err));

// const Sequelize = require('sequelize');
// require('dotenv').config();
// // create connection to our db
// const sequelize = process.env.JAWSDB_URL
//   ? new Sequelize(process.env.JAWSDB_URL)
//   : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
//       host: 'localhost',
//       dialect: 'mysql',
//       port: 3306
//     });

module.exports = sequelize;
