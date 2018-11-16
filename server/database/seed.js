const faker = require('faker');
const moment = require('moment');
const fs = require('fs');

const generateHour = () => {
  const stream = fs.createWriteStream('./server/database/hour.csv');
  stream.write('id,weeday,openingHour,closingHour,restaurantId\n');
  let i = 1;
  let j = 0;
  let k = 1;
  const write = () => {
    while (i < 70000000) {
      i += 1;
      j += 1;
      if (j === 7) {
        j = 0;
        k += 1;
      }
      let openingHour = 6 + Math.floor(Math.random() * 5);
      if (openingHour > 10) {
        openingHour = `0${openingHour}`;
      }
      if (Math.random() >= 0.5) {
        openingHour += ':30';
      } else {
        openingHour += ':00';
      }
      let closingHour = 21 + Math.floor(Math.random() * 5);
      if (closingHour > 24) {
        closingHour -= 24;
      }
      if (Math.random() >= 0.5) {
        closingHour += ':30';
      } else {
        closingHour += ':00';
      }
      if (!stream.write(`${i},${j},${openingHour},${closingHour},${k}\n`)) {
        return;
      }
    }
    stream.end(() => {
      console.log('hours data created');
    });
  };
  stream.on('drain', () => {
    write();
  });
  write();
};

const generateRestaurant = () => {
  const file = fs.createWriteStream('./server/database/restaurant.csv');
  file.write('id,name\n');
  let i = 1;
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

const generateReservation = () => {
  const stream = fs.createWriteStream('./server/database/reservation.csv');
  stream.write('id,reservee,time,restaurantId\n');
  let i = 1;
  const write = () => {
    while (i < 100000000) {
      i += 1;
      const restId = Math.floor(Math.random() * 100);
      const randomReservee = `${faker.name.findName()}`;
      const randomReservation = faker.date.future(0.05);
      let randomTime = parseInt(12 + (Math.random() * 10), 10);
      if (Math.random() >= 0.5) {
        randomTime += ':30:00';
      } else {
        randomTime += ':00:00';
      }
      randomTime = `${moment(randomReservation).format('YYYY-MM-DD')} ${randomTime}`;
      if (!stream.write(`{${i},${randomReservee},${randomTime},${restId}\n`)) {
        return;
      }
      if (i % 10000000 === 0) {
        console.log('working on it', i);
      }
    }
    stream.end(() => {
      console.log('reservations created');
    });
  };
  stream.on('drain', () => {
    write();
  });
  write();
};

generateReservation();
// generateHour();
// generateRestaurant();
