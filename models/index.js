// Import your Sequelize instance from '../config/connection'
const sequelize = require('../config/connection');

// Import and initialize your UserAccount and Post models
const { initializeUserAccount, UserAccount } = require('./userAccount');
const { initializePost, Post } = require('./post');

// Initialize the UserAccount and Post models with your Sequelize instance
const userAccountModel = initializeUserAccount(sequelize);
const postModel = initializePost(sequelize);

// Define associations between UserAccount and Post models
// A Post "has one" UserAccount (author), and a UserAccount "has many" Posts
// The 'onDelete: CASCADE' option ensures that if a UserAccount is deleted, its associated Posts are also deleted
UserAccount.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

// Define a reverse association to retrieve a UserAccount's posts
Post.belongsTo(userAccountModel, {
  foreignKey: 'user_id',
});

// Export the initialized models for use in other parts of the application
module.exports = {
  UserAccount: userAccountModel,
  Post: postModel,
};
