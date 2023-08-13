const express = require('express');

const router = express.Router();

router.get('/', async (req, res) => {
    res.status(200).json({
        error: false,
        message: process.env.APP_NAME + ' hoşgeldiniz!',
    });
});
router.get('/privacy-and-security', async(req, res) => {
    res.status(200).json({
        error:false,
        message: "Gizlilik ve Güvenlik politikamız",
        content:"İçerik geliyor..."
    });
});
router.get('/terms-of-service', async(req, res) => {
    res.status(200).json({
        error:false,
        message: "Hizmet Şartlarımız",
        content:"Hizmet şartlarımız yükleniyor..."
    });
});
router.get('/error', (req,res) => {
    res.status(404).json({
        error:true,
        message:'Hata var',
        errMessage:req.message
    });
});

module.exports = router;
