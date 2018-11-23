const { Client } = require('pg');

const client = new Client({
  database: 'reservations',
});
const connection = {};

connection.getReservations = (id, callback) => {
  client.connect();
  const query = `
    SELECT reservation.reservee,reservation.time,restaurant.name FROM reservation 
    INNER JOIN restaurant ON reservation.restaurantId = restaurant.id
    WHERE restaurantId = ${id}
  `;
  client.query(query, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
    client.end();
  });
};

connection.getHours = (id, callback) => {
  client.connect();
  const query = `
    SELECT hour.weekday,hour.openingHour,hour.closingHour,restaurant.name FROM hour
    INNER JOIN restaurant ON hour.restaurantId = restaurant.id
    WHERE restaurantId = ${id}
  `;
  client.query(query, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
    client.end();
  });
};

connection.addReservation = (id, req, callback) => {
  client.connect();
  const query = `insert into reservation (reservee, time, restaurantId) values('${req.body.reservee}','${req.body.time}', ${id})`;
  client.query(query, (err) => {
    if (err) {
      callback(err);
    } else {
      callback(null);
    }
    client.end();
  });
};

connection.deleteReservation = (id, callback) => {
  client.connect();
  const query = `delete from reservation where id = ${id}`;
  client.query(query, (err) => {
    if (err) callback(err);
    else callback(null);
    client.end();
  });
};

connection.updateReservation = (id, time, callback) => {
  client.connect();
  const query = `update reservation set time = '${time}' where id = ${id}`;
  client.query(query, (err) => {
    if (err) callback(err);
    else callback(null);
    client.end();
  });
};

module.exports = connection;
