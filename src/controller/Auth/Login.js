const UserService = require('../../service/UserService');
const {
    loginValidation,
} = require('../../validation/UserValidation');
const bcrypt = require('bcrypt');
const BaseLogger = require('../../logger/BaseLogger');

const Login = async (req, res) => {
    const logger = BaseLogger('info', 'user');
    try {
        const {
            error
        } = loginValidation(req.body);
        if (error) {
            logger.log({
                level: 'error',
                message: `Login sırasında VALIDATION hatası oluştu. ${new Date()} => ${error}`
            });
            return res.status(400).json({
                error: true,
                message: error.details[0].message
            });
        }
        const {
            email,
            password
        } = req.body;
        // password control
        const UserServiceInstance = new UserService();
        const user = await UserServiceInstance.getOne({
            email: email
        });
        // Login işleminde email var mı yok mu kontrolü
        if (!user) {
            logger.log({
                level: 'error',
                message: `${email} mailine sahip kullanıcı KAYITLI OLMADIĞI halde giriş yapmaya çalıştı. =>  ${new Date()}`
            });
            return res.status(401).json({
                error: true,
                message: 'Email Bulunamadı. Kayıtlı değilseniz kayıt olabilirsiniz',
                redirect:'register'
            });
        }
        //Girilen şifrenin hashi ile kayıtlı hashli şifre kontrolü yapılıyor.
        const verifyPassword = await bcrypt.compare(password, user.password);
        // console.log('verify', verifyPassword);
        //Şifre uyumlu değilse
        if (!verifyPassword) {
            logger.log({
                level: 'error',
                message: `${email} mailine sahip kullanıcı şifresini YANLIŞ girdi. =>  ${new Date()}`
            });
            return res.status(401).json({
                error: true,
                message: 'Parola yanlış girildi.',
            });
        }
        // email ve şifre uyumlu ancak henüz email doğrulaması yapılmadıysa
        if (!user.activation) {
            logger.log({
                level: 'info',
                message: `${email} mailine sahip kullanıcı AKTIVATION TAMAMLAMADAN giriş yapmaya çalıştı. =>  ${new Date()}`
            });
            return res.status(419).json({
                error: true,
                message: 'Henüz aktivasyon bekleniyor... Lütfen mail adresinizi kontrol edin.'
            });
        }

        // tokenlar üretiliyor.
        const {
            accessToken,
            refreshToken
        } = await user.tokenGenerator();
        // 1 günlük çerez oluşturuldu.
        // res.cookie('refresh', refreshToken, {
        //     httpOnly: true,
        //     maxAge: 24 * 60 * 60 * 1000
        // });
        // kullanıcı login olduktan sonra refresh token yenileniyor.
        logger.log({
            level: 'info',
            message: `${email} mailine sahip kullanıcı giriş yaptı. =>  ${new Date()}`
        });
        return res.status(200).json({
            error: false,
            message: 'Kullanıcı başarıyla giriş yaptı',
            redirect:'dashboard',
            user:user,
            accessToken,
            refreshToken,
        });
    } catch (error) {
        logger.log({
            level: 'error',
            message: `Login işleminde BEKLENMEYEN | BİLİNMEYEN HATA oluştu. DİKKAT!!! => ${new Date()}`
        });
        res.status(500).json({
            error: true,
            message: 'Sunucuda bir hata var!'
        })
    }
}

module.exports = Login;