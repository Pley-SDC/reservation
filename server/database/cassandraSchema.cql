Drop keyspace if exists reservations;

CREATE KEYSPACE reservations WITH replication = {'class': 'SimpleStrategy', 'replication_factor' : 3};

use reservations;

CREATE TABLE restaurant
(

  id INT primary key,
  name text,

);

CREATE TABLE reservation
(

  id INT,
  reservee text,
  time text,
  restaurantId INT,
  PRIMARY KEY (id)

);

CREATE TABLE hour 
(

  id INT, 
  weekday INT,
  openingHour text,
  closingHour Text,
  restaurantId INT,
  PRIMARY KEY (id)

);

copy reservations.hour (id, weekday, openinghour, closinghour, restaurantid) from '/Users/inhyub/Desktop/SDC/reservation-hours/server/database/hour.csv'
with header = true;

copy reservations.restaurant (id, name) from '/Users/inhyub/Desktop/SDC/reservation-hours/server/database/restaurant.csv'
with header = true;

copy reservations.reservation (id, reservee, time, restaurantid) from '/Users/inhyub/Desktop/SDC/reservation-hours/server/database/reservation.csv'
with header = true;
