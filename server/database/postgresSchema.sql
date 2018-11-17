drop database if exists reservations;

create database reservations;

\connect reservations;

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
  time text NOT NULL,
  restaurantId integer NOT NULL,
  PRIMARY KEY (id)

);

CREATE TABLE hour 
(

  id serial, 
  weekday integer NOT NULL,
  openingHour text NOT NULL,
  closingHour text NOT NULL,
  restaurantId integer NOT NULL,
  PRIMARY KEY (id)

);

copy hour from  '/Users/inhyub/Desktop/SDC/reservation-hours/server/database/hour.csv' delimiters ',' csv header;
copy restaurant from '/Users/inhyub/Desktop/SDC/reservation-hours/server/database/restaurant.csv' delimiters ',' csv header;
copy reservation from '/Users/inhyub/Desktop/SDC/reservation-hours/server/database/reservation.csv' delimiters ',' csv header;