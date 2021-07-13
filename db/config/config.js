const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  'development': {
    username: process.env.DB_U || 'talentlab',
    password: process.env.DB_P || 'talentlab',
    database: process.env.DB_NAME || 'talentlab',
    host: process.env.LOCAL ? '127.0.0.1' : 'postgres',
    port: 5432,
    dialect: 'postgres',
  },
  test: {},
  production: {},
};