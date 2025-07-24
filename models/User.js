const { DataTypes } = require('sequelize');
const sequelize = require('../dbConfig/db');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  token: {
    type: DataTypes.STRING,
  }
}, {
  timestamps: true, 
  tableName: 'users'
});

module.exports = User;