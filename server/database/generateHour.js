const fs = require('fs');

const generateHour = () => {
  const stream = fs.createWriteStream('./server/database/hour.csv');
  stream.write('id,weeday,openingHour,closingHour,restaurantId\n');
  let i = 0;
  let j = 0;
  let k = 0;
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

generateHour();
