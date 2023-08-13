const UserService = require('../../service/UserService');
const JWT  = require('jsonwebtoken');

const EmailVerify = async (req, res) => {
    const token = req.params.token;
    JWT.verify(token, process.env.EMAIL_SECRET_KEY, async(err, data) => {
        if(err){
            return res.status(500).json({
                error:true,
                message:'Token doğrulama başarılı olamadı.'
            });
        }
        console.log(data);
        const UserServiceInstance = new UserService();
        const user = await UserServiceInstance.getOne({_id:data.id, activation:false});
        if(!user){
            return res.status(500).json({
                error:true,
                message:'Zaten aktifsiniz. Aktivasyon işlemini daha önce tamamladığınızı unuttunuz sanırım!'
            })
        }
        await user.changeActivation();
        user.save((err, result) => {
            if (err) {
                return res.status(500).json({
                    error: true,
                    message: 'User aktivasyonu kaydedilmedi.'
                });
            }
            return res.status(200).json({
                error: false,
                message: 'User aktivasyonu tamamlandı.Kullanıcı login olabilir',
                redirect:'login'
            });
        });
    })
}
module.exports = EmailVerify;
