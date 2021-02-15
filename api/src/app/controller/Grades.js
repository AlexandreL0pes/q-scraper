const browser = require('../scraper/browser');
const { login } = require('../scraper/scrap');

const Grade = require('../models/Grade');
module.exports = {
  async index(req, res) {
    try {
      const { username, password } = req.body;
      const subjects = await Grade.findAll(username, password);
      return res.status(200).json(subjects);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Failed in get grades.' });
    }
  },
};
