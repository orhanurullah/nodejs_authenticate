const JWT = require('jsonwebtoken');
const UserToken = require('../model/UserToken');

const verifyRefreshToken = (refreshToken) => {
    const privateKey = process.env.REFRESH_TOKEN_SECRET_KEY;

    return new Promise((resolve, reject) => {
        UserToken.findOne({ token: refreshToken}, (err, doc) => {
            if(!doc){
                return reject({
                    error: true,
                    message: 'refresh token geçerli değil' + err
                });
            }
            JWT.verify(refreshToken, privateKey, (err, tokenDetails) => {
                if(err){
                    return reject({
                        error: true,
                        message: "refresh token anahtar token ile uyumlu değil"
                    });
                }
                resolve({
                    tokenDetails,
                    error:false,
                    message:"refresh token geçerlidir."
                });
            })
        })
    })
}

module.exports = {
    verifyRefreshToken
}