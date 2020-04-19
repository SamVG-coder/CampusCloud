const express = require("express");
const router = express.Router();
require('../config/is-auth');

const miniprojectController = require('../controllers/miniprojectController');

router.get('/add',isAuthenticated,miniprojectController.getAddProjectPage);
router.post('/submitDetails+',isAuthenticated,miniprojectController.addProject);
module.exports = router;