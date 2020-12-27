const express = require('express');
const router = express.Router();

const Grades = require('../app/controller/Grades');
const Scores = require('../app/controller/Scores');
const learning_materials = require('../app/controller/LearningMaterials');

router.get('/grades', Grades.index);
router.get('/score', Scores.index);
router.get('/learning_materials', learning_materials.index);

module.exports = router;
