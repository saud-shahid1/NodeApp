// filepath: d:\NodeApp\models\userModel.mysql.js
const User = require('./User');

exports.findUserByEmail = async (email) => {
  return await User.findOne({ where: { email } });
};

exports.createUser = async ({ name, email, password }) => {
  return await User.create({ name, email, password });
};

exports.updateUserToken = async (id, token) => {
  const user = await User.findByPk(id);
  if (user) {
    user.token = token;
    await user.save();
    return user;
  }
  return null;
};

exports.removeUserToken = async (id) => {
  const user = await User.findByPk(id);
  if (user) {
    user.token = null;
    await user.save();
    return user;
  }
  return null;
};

exports.updateUserPassword = async (id, newPassword) => {
    const user = await User.findByPk(id);
    if (user) {
        user.password = newPassword;
        await user.save();
        return user;
    }
    return null;
};