# Pley

>Module displays reservation table with time and number of guests. It also includes hours of operation of the restaurant and shows if the restaurant is open now.

![alt text](https://i.imgur.com/lEWUORR.jpg)
![alt text](https://i.imgur.com/DjBp7ox.jpg)

## Related Projects


## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

> First, you need to create the database. Schema file is stored in the server directory. To create scheam, simply type 'npm run db'.
> Dummy datas can be generated if you want. Type 'npm run seed' to do so.

> Local port to run the module is 5882. 

## Endpoints

| Action | Method | Endpoint | Purpose|
|---|---|---|---|
| Create | POST | /api/:restaurant_id/reservation | Make New Reservation |
| Read | GET | /api/:restaurant_id/reservation | Get Reservations |
| Read | GET | /api/:restaurant_id/hour | Get Hours of Operation |
| Update | PUT | /api/:restaurant_id/reservation | Update Reservation |
| Delete | DELETE | /api/:restaurant_id/reservation | Delete Reservation |

## Requirements

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

