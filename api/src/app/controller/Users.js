const { show } = require('../models/User');
const User = require('../models/User');

module.exports = {
  async show(req, res) {
    try {
      const {username, password} = req.body;
      const user_info = await User.show(username, password);

      return res.status(200).json(user_info);
    } catch (e) {
      console.error(e);
      return res.status(500).json({message: 'Failed in get user info'});
    }
  }
};
