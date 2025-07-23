require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: false,
  }
);

sequelize.authenticate()
  .then(() => {
    console.log('Connected to MySQL database.');
  })
  .catch((err) => {
    console.error('Sequelize connection error:', err.message);
  });

module.exports = sequelize;
