const User = require('./user');
const Post = require('./post');

Post.hasOne(User, {
  foreignKey: 'UserName',
  onDelete: 'CASCADE',
});

User.hasMany(Post, {
  foreignKey: 'UserName',
  onDelete: 'CASCADE',
});

Post.belongsTo(User, {
  foreignKey: 'UserName',
});

module.exports = { User, Post };