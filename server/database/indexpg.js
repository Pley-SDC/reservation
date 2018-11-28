const { Client } = require('pg');

const client = new Client({
  database: 'reservations',
  host: 'localhost',
});
const connection = {};

client.connect();

connection.getReservations = (id, callback) => {
  const query = `
    SELECT reservation.reservee,reservation.time,restaurant.name FROM reservation 
    INNER JOIN restaurant ON reservation.restaurantId = restaurant.id
    WHERE restaurantId = ${id}
  `;
  client.query(query, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result.rows);
    }
  });
};

connection.getHours = (id, callback) => {
  const query = `
    SELECT hour.weekday,hour.openingHour,hour.closingHour,restaurant.name FROM hour
    INNER JOIN restaurant ON hour.restaurantId = restaurant.id
    WHERE restaurantId = ${id}
  `;
  client.query(query, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result.rows);
    }
  });
};

connection.addReservation = (id, req, callback) => {
  const query = `insert into reservation (reservee, time, restaurantId) values('${req.body.reservee}','${req.body.time}', ${id})`;
  client.query(query, (err) => {
    if (err) {
      callback(err);
    } else {
      callback(null);
    }
  });
};

connection.deleteReservation = (id, callback) => {
  const query = `delete from reservation where id = ${id}`;
  client.query(query, (err) => {
    if (err) callback(err);
    else callback(null);
  });
};

connection.updateReservation = (id, time, callback) => {
  const query = `update reservation set time = '${time}' where id = ${id}`;
  client.query(query, (err) => {
    if (err) callback(err);
    else callback(null);
  });
};

module.exports = connection;
