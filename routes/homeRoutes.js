const express = require("express");
const router = express.Router();

require('../config/is-auth');

const homeController = require('../controllers/homeController');

router.get('/',homeController.getHomePage);

router.get('/interview',homeController.getInterviewPage);

router.get('/majorproject',isAuthenticated,homeController.getMajorProjectPage);

router.get('/miniproject',homeController.getMiniProjectPage);

module.exports = router;
