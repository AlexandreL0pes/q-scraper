const { show } = require('../models/User');
const User = require('../models/User');

module.exports = {
  async show(req, res) {
    try {
      const {username, password} = req.body;
      const {name, course} = await User.show(username, password);

      return res.status(200).json({name, course});
    } catch (e) {
      console.error(e);
      return res.status(500).json({message: 'Failed in get user info'});
    }
  }
};
