// filepath: d:\NodeApp\models\userModel.mongo.js
const User = require('./User.mongo');

exports.findUserByEmail = async (email) => {
  return await User.findOne({ email: email });
};

exports.createUser = async ({ name, email, password }) => {
  const user = new User({ name, email, password });
  return await user.save();
};

exports.updateUserToken = async (id, token) => {
  return await User.findByIdAndUpdate(id, { token }, { new: true });
};

exports.removeUserToken = async (id) => {
  return await User.findByIdAndUpdate(id, { token: null }, { new: true });
};

exports.updateUserPassword = async (id, newPassword) => {
    return await User.findByIdAndUpdate(id, { password: newPassword }, { new: true });
};