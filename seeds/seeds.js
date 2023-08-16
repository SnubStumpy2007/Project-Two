const sequelize = require('../config/connection');
const { User , Post } = require('../models');

const userAccount = require('./userAccounts.json');
const userPost = require('./userPosts.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userAccount, {
    individualHooks: true,
    returning: true,
  });

  for (const post of userPosts) {
    await Post.Create({
        ...post,
        userAccount: users[Math.floor(Math.random() * users.length)].id,
  });
}

  process.exit(0);
};

seedDatabase();