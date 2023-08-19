const sequelize = require('../config/connection');
const { UserAccount , Post } = require('../models');

const userAccount = require('./userAccounts.json');
const userPosts = require('./userPosts.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await UserAccount.bulkCreate(UserAccount, {
    individualHooks: true,
    returning: true,
  });

  for (const post of userPosts) {
    await Post.create({
      ...post,
      UserName: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();