const Sequelize = require('sequelize');
const config = require('./config.json').development; // Adjust as necessary (e.g., 'production', 'test')

// Use environment variables if they're defined, otherwise fallback to config.json values
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

module.exports = sequelize;
