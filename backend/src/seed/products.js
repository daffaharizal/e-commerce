const { faker } = require('@faker-js/faker');
const Product = require('../models/Product');

const createRandomProduct = async () => {
  const PRODUCTS = [];
  Array.from({ length: 1000 }).forEach(() => {
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
      user: '634bffdfc98f864b95cdd3d8'
    });
  });
  await Product.create(...PRODUCTS);
  return PRODUCTS;
};

module.exports = createRandomProduct;
