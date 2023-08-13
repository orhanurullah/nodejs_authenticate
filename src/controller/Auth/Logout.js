const BaseLogger = require('../../logger/BaseLogger');
const {addTokenToBlackList} =  require('../../utils/blacklist');

const Logout = async (req, res) => {
    const user = req.user;
    await addTokenToBlackList(req.body.token);
    const logger = BaseLogger('info', 'user');

    logger.log({
        level: 'info',
        message: `bu ${user.email} mailine sahip kullanıcının çıkış işlemi yapıldı ve token silindi. ${new Date()}`
    });
    return res.status(200).json({
        error: false,
        message: 'User için Çıkış yapılıyor ve token kara listeye alınıyor...'
    });
}
module.exports = Logout;