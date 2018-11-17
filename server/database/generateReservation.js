const faker = require('faker');
const moment = require('moment');
const fs = require('fs');

const generateReservation = () => {
  const stream = fs.createWriteStream('./server/database/reservation.csv');
  stream.write('id,reservee,time,restaurantId\n');
  let i = 0;
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
      if (!stream.write(`${i},${randomReservee},${randomTime},${restId}\n`)) {
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
