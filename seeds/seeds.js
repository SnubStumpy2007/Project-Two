// Import the Sequelize instance and necessary models
const sequelize = require('../config/connection');
const { UserAccount, Post } = require('../models');

// Import JSON data for user accounts and posts
const userAccountData = require('./userAccounts.json');
const userPostsData = require('./userPosts.json');

// Define a function to seed the database
const seedDatabase = async () => {
  // Sync the database and force a reset (deleting existing data)
  await sequelize.sync({ force: true });

  // Bulk insert user accounts using individual hooks and returning the created records
  const users = await UserAccount.bulkCreate(userAccountData, {
    individualHooks: true,
    returning: true,
  });

  // Loop through userPostsData and create posts for each user
  for (const post of userPostsData) {
    await Post.create({
      ...post,
      // Assign a random user ID as the UserName for each post
      UserName: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  // Exit the process once seeding is complete
  process.exit(0);
};

// Call the seedDatabase function to start the seeding process
seedDatabase();