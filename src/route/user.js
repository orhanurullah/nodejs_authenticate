const express = require('express');
const { auth } = require('../middleware/auth');
const User = require('../model/User');
const Logout = require('../controller/Auth/Logout');
const RefreshToken = require('../controller/Auth/RefreshToken');
// const RemoveToken = require('../controller/Auth/RemoveToken');


const router = express.Router();
router.use(auth);

router.delete('/logout', Logout);

router.post('/refresh-token',  RefreshToken);
// router.delete('/refresh-token/delete', auth, RemoveToken);

router.get('/', async (req, res) => {
    console.log(req.user);
    return res.status(200).json({
        error: false,
        message: 'Kullanıcı yetkilidir. User ana sayfasındasınız.',
        user: req.user
    });
});
router.get('/profile', async (req, res) => {
    res.status(200).json({
        error: false,
        message: 'Kullanıcının profil sayfasındasınız.',
        user: req.user,
    });
});

module.exports = router;
