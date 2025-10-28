const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  "development": {
    "username": "postgres",
    "password": "docker",
    "database": "dtiflix_db",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": "postgres",
    "password": "docker",
    "database": "dtiflix_db",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "username": "postgres",
    "password": "docker",
    "database": "dtiflix_db",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
};