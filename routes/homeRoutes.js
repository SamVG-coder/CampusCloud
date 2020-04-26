const express = require("express");
const router = express.Router();

require('../config/is-auth');

const homeController = require('../controllers/homeController');

router.get('/',homeController.getHomePage);

router.get('/interviews',homeController.getInterviewPage);

router.get('/majorproject',homeController.getMajorProjectPage);

router.get('/miniproject',homeController.getMiniProjectPage);

router.get('/studymaterial',homeController.getStudymaterialPage);

module.exports = router;


