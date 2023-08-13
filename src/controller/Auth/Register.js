const UserService = require('../../service/UserService');
const {
    createValidation,
} = require('../../validation/UserValidation');
const bcrypt = require('bcrypt');
const BaseLogger = require('../../logger/BaseLogger');
const sendEmailVerifyMail = require('../../utils/sendEmailVerifyMail');

const Register = async (req, res) => {
    try {
        //Joi kontrolü yapılıyor.
        const logger = BaseLogger('info', 'user');

        const {
            error
        } = createValidation(req.body);
        if (error) {
            logger.log({
                level: 'error',
                message: `Login sırasında doğrulama hatası oluştu. ${new Date()}`
            });
            return res.status(400).json({
                error: true,
                message: error.details[0].message
            });
        }
        const {
            firstName,
            lastName,
            email,
            password
        } = req.body;
        const UserServiceInstance = new UserService();
        await UserServiceInstance.getOne({
            email: email
        }).then(async (user) => {
            if (user && user.activation) {
                logger.log({
                    level: 'error',
                    message: `Kullanıcı aktivasyonunu tamamlamış ama TEKRAR KAYIT olmaya çalışmaktadır. ${new Date()}`
                });
                return res.status(400).json({
                    error: true,
                    message: 'Bu email aktivasyonu tamamlanmış bir hesaptır. Login olabilirsiniz.'
                });
            } else if (user && !user.activation) {
                logger.log({
                    level: 'error',
                    message: `Kullanıcı aktivasyonunu tamamlamamış ve TEKRAR KAYIT yapmaya çalışmaktadır. ${new Date()}`
                });
                return res.status(500).json({
                    error: true,
                    message: 'Bu kullanıcı henüz aktif değildir. Aktivasyon için mail gönderilmeli. Bunun için kullanıcıdan mail talebi alınmalı.',
                    redirect:'refresh-verify-email/' + user._id
                });
            }
            //kullanıcının şifresi hash'lenir
            const hashPassword = await bcrypt.hash(password, 10);

            //yeni kullanıcıyı database'e yazma işlemi yapılır.
            const newUser = await UserServiceInstance.insert({
                firstName,
                lastName,
                email,
                password: hashPassword
            });
            logger.log({
                level: 'info',
                message: `Kullanıcı kaydı tamamlanmıştır. => ${new Date()}`
            });
            //yeni kullanıcı role admin değilse
            if (newUser.role !== process.env.ADMIN_ROLE) {
                sendEmailVerifyMail(newUser);
                logger.log({
                    level: 'info',
                    message: `Kullanıcıya aktivasyonunu tamamlaması için email gönderilmiştir. ${new Date()}`
                });
            }
            return res.status(201).json({
                error: false,
                message: 'Kullanıcı kaydı başarıyla yapıldı. Email doğrulaması için mail gönderildi. Lütfen mailinizi kontrol edin.',
                redirect:'login'
            });
        }).catch((err) => {
            logger.log({
                level: 'error',
                message: `Database sorgusunda bir HATA VAR. ${new Date()}`
            });
            return res.status(404).json({
                error: true,
                message: 'Sorgu hatası' + err
            })
        });

    } catch (err) {
        logger.log({
            level: 'error',
            message: `BİLİNMEYEN bir hata oluştu DİKKAT!!!. ${new Date()}`
        });
        return res.status(500).json({
            error: true,
            message: 'Sunucuda bir hata var!'
        });
    }
}

module.exports = Register;