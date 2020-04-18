const express = require("express");
const router = express.Router();

const miniprojectController = require('../controllers/miniprojectController');

router.get('/add',miniprojectController.getAddProjectPage);

module.exports = router;