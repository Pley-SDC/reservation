const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'reservation_hour',
});

// connection.connect();

connection.getReservations = (id, callback) => {
  const query = `
    SELECT reservation.reservee,reservation.time,restaurant.name FROM reservation 
    INNER JOIN restaurant ON reservation.restaurantId = restaurant.id
    WHERE restaurantId = ${id}
  `;
  connection.query(query, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

connection.getHours = (id, callback) => {
  const query = `
    SELECT hour.weekday,hour.openingHour,hour.closingHour,restaurant.name FROM hour
    INNER JOIN restaurant ON hour.restaurantId = restaurant.id
    WHERE restaurantId = ${id}
  `;
  connection.query(query, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

connection.addReservation = (id, req, callback) => {
  const query = 'insert into reservation (reservee, time, restaurantId) values(?,?,?)';
  connection.query(query, [req.body.reservee, req.body.time, id], (err) => {
    if (err) callback(err, null);
    else callback(null);
  });
};

connection.deleteReservation = (id, callback) => {
  const query = 'delete from reservation where id = ?';
  connection.query(query, [id], (err) => {
    if (err) callback(err);
    else callback(null);
  });
};

connection.updateReservation = (id, time, callback) => {
  const query = 'update reservation set time = ? where id = ?';
  connection.query(query, [time, id], (err) => {
    if (err) callback(err);
    else callback(null);
  });
};

// module.exports = connection;
