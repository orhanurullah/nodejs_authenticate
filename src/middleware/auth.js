const JWT = require('jsonwebtoken');
const {hasTheTokenInBlackList} =  require('../utils/blacklist');

const auth = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if(!token){
        return res.status(403).json({
            error: true,
            message: 'Hatalı Giriş. Token bulunamadı'
        });
    }
    if(await hasTheTokenInBlackList(token)){
        return res.status(403).json({
            error: true,
            message: 'Token kara listede, kullanıcı logout olmuş'
        });
    }
    try{
        const tokenDetails = JWT.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET_KEY
        );
        req.user = tokenDetails;
        next();
    }catch(err){
        res.status(403).json({
            error: true,
            message: 'Geçersiz Token'
        });
    }
}

module.exports = {
    auth
}