import { faker } from '@faker-js/faker';

import Category from '../models/Category';
import Product from '../models/Product';
import User from '../models/User';

const createRandomProducts = async () => {
  const CATEGORIES = [];
  Array.from({ length: 2 }).forEach(() => {
    CATEGORIES.push({
      name: faker.helpers.arrayElement([
        'office',
        'kitchen',
        'bedroom',
        'living'
      ])
    });
  });
  await Category.create(...CATEGORIES);

  const PRODUCTS = [];
  const user = await User.findOne({ role: 'admin' });
  const category = await Category.findOne();
  user &&
    Array.from({ length: 10 }).forEach(() => {
      PRODUCTS.push({
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        category: category.id,
        skus: [
          {
            sku: faker.color.human(),
            type: 'color',
            price: faker.commerce.price(200, 2000, 0),
            stock: faker.random.numeric(),
            features: [
              faker.commerce.productMaterial(),
              faker.commerce.productMaterial(),
              faker.commerce.productMaterial()
            ],
            varients: [
              faker.helpers.arrayElement(['XS', 'S', 'M', 'L', 'XL']),
              faker.helpers.arrayElement(['XS', 'S', 'M', 'L', 'XL'])
            ],
            images: [
              {
                name: faker.commerce.productName(),
                url: faker.image.business(1234, 2345, true),
                isPublicUrl: true
              },
              {
                name: faker.commerce.productName(),
                url: faker.image.business(1234, 2345, true),
                isPublicUrl: true
              },
              {
                name: faker.commerce.productName(),
                url: faker.image.business(1234, 2345, true),
                isPublicUrl: true
              }
            ]
          },
          {
            sku: faker.color.human(),
            type: 'color',
            price: faker.commerce.price(200, 2000, 0),
            stock: faker.random.numeric(),
            features: [
              faker.commerce.productMaterial(),
              faker.commerce.productMaterial(),
              faker.commerce.productMaterial()
            ],
            varients: [
              faker.helpers.arrayElement(['XS', 'S', 'M', 'L', 'XL']),
              faker.helpers.arrayElement(['XS', 'S', 'M', 'L', 'XL'])
            ],
            images: [
              {
                name: faker.commerce.productName(),
                url: faker.image.business(1234, 2345, true),
                isPublicUrl: true
              },
              {
                name: faker.commerce.productName(),
                url: faker.image.business(1234, 2345, true),
                isPublicUrl: true
              },
              {
                name: faker.commerce.productName(),
                url: faker.image.business(1234, 2345, true),
                isPublicUrl: true
              }
            ]
          }
        ],
        featured: faker.datatype.boolean(),
        freeShipping: faker.datatype.boolean(),
        averageRating: 0,
        numOfReviews: 0,
        user: user.id
      });
    });
  await Product.create(...PRODUCTS);
  return PRODUCTS;
};

export default createRandomProducts;
