const express = require("express");
const router = express.Router();

const majorprojectController = require('../controllers/majorprojectController');

router.post('/projects',majorprojectController.searchProjects);

module.exports = router;