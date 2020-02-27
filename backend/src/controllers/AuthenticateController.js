const mongoose = require('mongoose');

const User = mongoose.model('User');

module.exports = {
  async signIn(req, res) {
    const { username, password } = req.body;
    const data = await User.findOne({ username, password });
    if (data) {
      const { name, _id } = data;
      username === data.username && password === data.password
        ? res.status(200).json({ result: true, user: { name, _id } })
        : res.status(200).json({ result: false });
    } else {
      return res.status(200).json({ result: false, message: 'User not found' });
    }
  },

  async signUp(req, res) {
    await User.create(req.body);
    return res.status(201).json({ result: true, message: 'User created' });
  }
};
