const express = require("express");
const router = express.Router();
require('../config/is-auth');

const miniprojectController = require('../controllers/miniprojectController');

router.get('/add',isAuthenticated,miniprojectController.getAddProjectPage);
router.post('/submitDetails+',isAuthenticated,miniprojectController.addProject);
router.post('/projects',miniprojectController.searchProjects);

module.exports = router;