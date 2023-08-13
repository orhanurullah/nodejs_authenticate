const JWT  = require('jsonwebtoken');

const createToken = async(data, key, exp) => {
    return  JWT.sign(data, key, {
        expiresIn:exp
    });
}

const verifyToken = async(token, key) => {
    return JWT.verify(token, key, (err, data) => {
        if(err){
            return false;
        }
        return data;
    });
}

module.exports = {
    createToken,
    verifyToken
}
