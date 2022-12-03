import { faker } from '@faker-js/faker';

import User from '../models/User';

const createRandomUsers = async () => {
  const USERS = [];
  Array.from({ length: 25 }).forEach(() => {
    USERS.push({
      fullName: faker.name.fullName(),
      email: faker.internet.email(),
      dateOfBirth: faker.date.birthdate(),
      password: 'abc12345',
      role: 'user',
      isVerified: true
      // password: faker.internet.password(),
      // avatar: faker.image.avatar(),
      // role: faker.helpers.arrayElement(['admin', 'user'])
    });
  });
  await User.create(...USERS);
  return USERS;
};

export default createRandomUsers;
