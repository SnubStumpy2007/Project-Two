const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

// Initialize Sequelize instance
let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Require initialization functions
const { initializeUserAccount, UserAccount } = require('./userAccount');
const { initializePost, Post } = require('./post');

// Initialize models
initializeUserAccount(sequelize);
initializePost(sequelize);

// Set Associations
Post.hasOne(UserAccount, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

UserAccount.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Post.belongsTo(UserAccount, {
  foreignKey: 'user_id',
});

// Export Models
module.exports = { UserAccount, Post };
