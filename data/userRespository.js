// filepath: d:\NodeApp\data\userRepository.js
const dbType = process.env.DB_TYPE || 'mysql';

let repo;
if (dbType === 'mongo') {
  repo = require('../models/userModel.mongo');
} else {
  repo = require('../models/userModel.mysql');
}

module.exports = repo;