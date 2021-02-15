const browser = require('../scraper/browser');
const { login } = require('../scraper/scrap');

const Score = require('../models/Score');

module.exports = {
  async index(req, res) {
    try {
      const { username, password } = req.body;
      const scores = await Score.findAll(username, password);
      return res.status(200).json(scores);
    } catch (e) {
      console.error(e);
      return res.status(500).json({ message: 'Failed in get scores' });
    }
  },
};
