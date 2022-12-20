import { faker } from '@faker-js/faker';

import User from '../models/User.js';

const createRandomUsers = async () => {
  const USERS = [];
  Array.from({ length: 10 }).forEach(() => {
    USERS.push({
      fullName: faker.name.fullName(),
      email: faker.internet.email(),
      dateOfBirth: faker.date.birthdate(),
      password: 'abc12345',
      // password: faker.internet.password(),
      role: 'user',
      isAccountVerified: true,
      avatar: {
        name: faker.word.adjective(),
        url: faker.image.avatar(),
        isPublicUrl: true
      },
      billingAddress: [
        {
          country: faker.address.country(),
          province: faker.address.state(),
          city: faker.address.cityName(),
          street1: faker.address.streetAddress(),
          street2: faker.address.street(),
          zip: faker.address.zipCode()
        }
      ],
      shippingAddress: [
        {
          country: faker.address.country(),
          province: faker.address.state(),
          city: faker.address.cityName(),
          street1: faker.address.streetAddress(),
          street2: faker.address.street(),
          zip: faker.address.zipCode()
        },
        {
          country: faker.address.country(),
          province: faker.address.state(),
          city: faker.address.cityName(),
          street1: faker.address.streetAddress(),
          street2: faker.address.street(),
          zip: faker.address.zipCode()
        }
      ]
    });
  });
  await User.create(...USERS);
  return USERS;
};

export default createRandomUsers;
