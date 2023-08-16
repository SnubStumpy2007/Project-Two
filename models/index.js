const User = require('./user');
const Post = require('./post');

User.hasOne(UserName, {
  foreignKey: 'UserName',
  onDelete: 'CASCADE',
});

User.hasMany(Post, {
  foreignKey: 'UserName',
  onDelete: 'CASCADE',
});

Post.belongsTo(UserName, {
  foreignKey: 'UserName',
});

module.exports = { User, Post };