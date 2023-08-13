const UserService = require('../../service/UserService');
const sendEmailVerifyMail = require('../../utils/sendEmailVerifyMail');

const RefreshEmailVerify = async(req, res) => {
    const id = req.params.id;
    const UserServiceInstance = new UserService();
    const user = await UserServiceInstance.getOne({
        _id: id
    });

    sendEmailVerifyMail(user);
    return res.status(200).json({
        error:false,
        message:'Yeni email gönderildi.'
    });
}
module.exports = RefreshEmailVerify;