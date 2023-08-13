const express = require('express');
const Login = require('../controller/Auth/Login');
const Register = require('../controller/Auth/Register');

const { isAuthenticate } = require('../middleware/isAuthenticate');
// const changeActivation = require('../controller/management/ChangeActivation');
const EmailVerify = require('../controller/Auth/EmailVerify');
const RefreshEmailVerify = require('../controller/Auth/RefreshEmailVerify');
const router = express.Router();
router.use(isAuthenticate);
router.post('/login',  Login);
router.post('/register', Register);
router.get('/verify-email/:token', EmailVerify);
router.get('/refresh-verify-email/:id', RefreshEmailVerify);


module.exports = router;