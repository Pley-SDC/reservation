const faker = require('faker');
const fs = require('fs');

const generateRestaurant = () => {
  const file = fs.createWriteStream('./server/database/restaurant.csv');
  file.write('id,name\n');
  let i = 0;
  const write = () => {
    while (i < 10000000) {
      i += 1;
      const randomName = `${faker.company.catchPhraseAdjective()} ${faker.company.bsNoun()}`;
      if (!file.write(`${i},${randomName}\n`)) {
        return;
      }
    }
    file.end(() => {
      console.log('restaurants created');
    });
  };
  file.on('drain', () => {
    write();
  });
  write();
};

generateRestaurant();
