const { faker } = require('@faker-js/faker');
const User = require('../models/User');

const createRandomUser = async () => {
  const USERS = [];
  Array.from({ length: 10 }).forEach(() => {
    USERS.push({
      fullName: faker.name.fullName(),
      email: faker.internet.email(),
      dateOfBirth: faker.date.birthdate(),
      password: 'abc12345',
      // password: faker.internet.password(),
      // avatar: faker.image.avatar(),
      role: faker.helpers.arrayElement(['admin', 'user']),
      registeredAt: faker.date.past()
    });
  });
  await User.create(...USERS);
  return USERS;
};

module.exports = createRandomUser;
