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

// Initialize models using the Sequelize instance
const UserAccount = require('./userAccount')(sequelize);
const Post = require('./post')(sequelize);

// Set Associations
Post.hasOne(UserAccount, {
  foreignKey: 'UserName',
  onDelete: 'CASCADE',
});

UserAccount.hasMany(Post, {
  foreignKey: 'UserName',
  onDelete: 'CASCADE',
});

Post.belongsTo(UserAccount, {
  foreignKey: 'UserName',
});

// Export Models
module.exports = { UserAccount, Post };
