// Import the Sequelize library
const Sequelize = require('sequelize');

// Load environment variables from a .env file
require('dotenv').config();

// Create a connection to the database
const sequelize = process.env.JAWSDB_URL
  ? // If a JAWSDB_URL environment variable exists, create a connection using that URL
    new Sequelize(process.env.JAWSDB_URL)
  : // If not, create a connection using the specified database, user, password, host, dialect, and port
    new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
      host: 'localhost',
      dialect: 'mysql', // Specify the dialect as MySQL
      port: 3306 // Specify the port for the database connection
    });

// Export the Sequelize instance for use in other parts of the application
module.exports = sequelize;