const express = require("express");
const router = express.Router();

require('../config/is-auth');

const materialController = require('../controllers/materialController');

router.get('/add',materialController.getAddMaterialPage);

module.exports = router;