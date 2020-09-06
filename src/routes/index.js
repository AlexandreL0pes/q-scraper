const express = require('express');
const router = express.Router();

const Grades = require('../app/controller/Grades');
const Scores = require('../app/controller/Scores');

router.get('/grades', Grades.index);

router.get('/score', Scores.index);

module.exports = router;
