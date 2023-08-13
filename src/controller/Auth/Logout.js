const BaseLogger = require('../../logger/BaseLogger');
const {addTokenToBlackList, hasTheTokenInBlackList} =  require('../../utils/blacklist');


const Logout = async (req, res) => { 

    const logger = BaseLogger('info', 'user');
    const user = req.user;
    const token = req.headers.authorization?.split(" ")[1];
    req.headers.authorization = null;
    await addTokenToBlackList(token);


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