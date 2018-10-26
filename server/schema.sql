CREATE DATABASE reservation_hour;

use reservation_hour;

CREATE TABLE restaurant
(

  id INT(11) NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  availableTable INT(11) NOT NULL,
  totalTable INT(11) NOT NULL,
  PRIMARY KEY (id)

);

CREATE TABLE reservation
(

  id INT(11) NOT NULL AUTO_INCREMENT,
  reservee VARCHAR(50) NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  restaurant_id INT(11) NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT reservation_restaurant_id_fk
  FOREIGN KEY (restaurant_id) REFERENCES restaurant(id)

);

CREATE TABLE hour 
(

  id INT (11) NOT NULL AUTO_INCREMENT, 
  weekday VARCHAR(20) NOT NULL,
  opening_hour TIME NOT NULL,
  closing_hour TIME NOT NULL,
  restaurant_id INT(11) NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT hour_restaurant_id_fk
  FOREIGN KEY (restaurant_id) REFERENCES restaurant(id)

)
