import { faker } from '@faker-js/faker';

import Product from '../models/Product';
import User from '../models/User';

const createRandomProducts = async () => {
  const PRODUCTS = [];
  const user = await User.findOne({ role: 'admin' });
  user &&
    Array.from({ length: 50 }).forEach(() => {
      PRODUCTS.push({
        name: faker.commerce.productName(),
        price: faker.commerce.price(200, 2000, 0),
        description: faker.commerce.productDescription(),
        images: {
          name: faker.commerce.productName(),
          url: faker.image.business(1234, 2345, true),
          isPublicUrl: true
        },
        category: faker.helpers.arrayElement([
          'office',
          'kitchen',
          'bedroom',
          'living'
        ]),
        // company: faker.company.name(),
        company: faker.helpers.arrayElement(['damro', 'godrej india', 'usha']),
        colors: faker.color.rgb(),
        featured: faker.datatype.boolean(),
        inventory: faker.datatype.boolean(),
        averageRating: 0,
        numOfReviews: 0,
        user: user.id
      });
    });
  await Product.create(...PRODUCTS);
  return PRODUCTS;
};

export default createRandomProducts;
