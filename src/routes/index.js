const express = require('express');
const router = express.Router();

const Grades = require('../app/controller/Grades');

router.get('/grades', Grades.index);

module.exports = router;
