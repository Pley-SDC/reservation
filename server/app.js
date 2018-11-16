const path = require('path');
const express = require('express');
const db = require('./database');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

app.get('/api/:restaurant_id/reservation', (req, res) => {
  const id = req.params.restaurant_id;
  db.getReservations(id, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

app.get('/api/:restaurant_id/hour', (req, res) => {
  const id = req.params.restaurant_id;
  db.getHours(id, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

app.post('/api/:restaurant_id/reservation', (req, res) => {
  const restaurantId = req.params.restaurant_id;
  db.addReservation(restaurantId, req, (err) => {
    if (err) res.status(500).send(err);
    res.sendStatus(201);
  });
});

app.delete('/api/:restaurant_id/reservation', (req, res) => {
  const id = req.body.reservation_id;
  db.deleteReservation(id, (err) => {
    if (err) res.status(500).send(err);
    res.send();
  });
});

app.put('/api/:restaurant_id/reservation', (req, res) => {
  const id = req.body.reservation_id;
  const { time } = req.body;
  db.updateReservation(id, time, (err) => {
    if (err) res.status(500).send(err);
    res.send();
  });
});

app.get('/:restaurant_id/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(3002);
