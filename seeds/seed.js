const sequelize = require('../config/connection');
const { User, Post } = require('../models');

const userData = require('./userData.json');
const createPosts = require('./postData')

const seedDatabase = async () => {
    // initialize the db
  await sequelize.sync({ force: true });

// clear the db
// await User.destroy({});
// await Post.destroy({});

// add users from the userData file
  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

//   add the posts from the posts function
  await Post.bulkCreate(createPosts(), {
    individualHooks: true,
    returning: true
})

  process.exit(0);
};

seedDatabase();