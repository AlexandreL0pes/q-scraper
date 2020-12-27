const Document = require('../models/LearningMaterial');

module.exports = {
  async index(req, res) {
    try {
      const { username, password } = req.body;
      const documents = await Document.findAll(username, password);
      return res.status(200).json(documents);
    } catch (error) {
      console.error(e);
      return res.status(500).json({ message: 'Failed in get documents' });
    }
  },
};
