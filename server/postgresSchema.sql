drop table if exists restaurant;
drop table if exists reservation;
drop table if exists hour;

CREATE TABLE restaurant
(

  id serial,
  name VARCHAR(100) NOT NULL,
  PRIMARY KEY (id)

);

CREATE TABLE reservation
(

  id serial,
  reservee VARCHAR(50) NOT NULL,
  time TIME NOT NULL,
  restaurantId integer NOT NULL,
  PRIMARY KEY (id)

);

CREATE TABLE hour 
(

  id serial, 
  weekday integer NOT NULL,
  openingHour TIME NOT NULL,
  closingHour TIME NOT NULL,
  restaurantId integer NOT NULL,
  PRIMARY KEY (id)

);