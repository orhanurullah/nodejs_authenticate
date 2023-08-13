const JWT = require('jsonwebtoken');

const generateTokens = async (user) => {
    try{
        const payload = { username:user.firstName+" "+user.lastName, id:user._id,  email:user.email, firstName:user.firstName, lastName: user.lastName, role:user.role, subscribers:user.subscribers };
        const accessToken = JWT.sign(
            payload,
            process.env.ACCESS_TOKEN_SECRET_KEY,
            { expiresIn : process.env.ACCESS_TOKEN_EXPIRES_IN }
        );
        const refreshToken = JWT.sign(
            payload,
            process.env.REFRESH_TOKEN_SECRET_KEY,
            { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN }
        );
        return Promise.resolve({ accessToken, refreshToken});
    }catch(err){
        return Promise.reject(err);
    }
};

module.exports = {
    generateTokens
}