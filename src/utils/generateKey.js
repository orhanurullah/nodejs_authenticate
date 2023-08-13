const crypto = require('crypto');

const generateKey = (data) => {
    return crypto.randomBytes(data).toString("hex");
}
module.exports =  generateKey;