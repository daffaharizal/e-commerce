import { faker } from '@faker-js/faker';

import Product from '../models/Product';
import Review from '../models/Review';
import User from '../models/User';

const createRandomReviews = async () => {
  const REVIEWS = [];
  const users = await User.find({ role: 'user' });
  const product = await Product.findOne();
  product.length !== 0 &&
    Array.from({ length: 1 }).forEach(() => {
      users.forEach((user) => {
        REVIEWS.push({
          title: faker.random.word(),
          rating: faker.datatype.number({ min: 1, max: 5, precision: 1 }),
          comment: faker.lorem.sentences(3),
          product: product.id,
          user: user.id
        });
      });
    });
  await Review.create(...REVIEWS);
  return REVIEWS;
};

export default createRandomReviews;
