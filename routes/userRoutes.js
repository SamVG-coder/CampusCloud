const express = require("express");
const router = express.Router();
const passport= require("passport");
const userController = require('../controllers/userController');


router.post('/register',userController.createUser);
router.get('/signup',userController.getSignupPage);
router.get('/login',userController.getLoginPage);
router.post('/verify-otp',userController.getOtp);
router.get('/reset-pass',userController.getForgotPasswordPage);
router.post('/new-pass',userController.getOtpForResetPassword);
router.post('/otp',userController.checkEmail);
router.post('/password-updated',userController.setNewPassword);
router.post('/auth',userController.loginUser);
router.get('/logout',userController.logoutUser);
module.exports = router;