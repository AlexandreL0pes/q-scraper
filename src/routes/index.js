const express = require('express');
const router = express.Router();

const Grades = require('../app/controller/Grades');
const Scores = require('../app/controller/Scores');
const Documents = require('../app/controller/Documents');

router.get('/grades', Grades.index);
router.get('/score', Scores.index);
router.get('/documents', Documents.index);

module.exports = router;
