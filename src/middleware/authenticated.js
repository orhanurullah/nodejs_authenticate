const JWT = require('jsonwebtoken');
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 * Sadece register ve login işlemleri öncesi kullanıcı olup olmadığının sorgusu için kullanılır.
 */

const authenticated = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (token) {
        return res.status(500).json({
            error: true,
            message: 'Hatalı İstek. Oturum mevcut. yönlendirme yapılacak. Dilerseniz oturumu kapattıktan sonra deneyebilirsiniz.'
        });
    }
    next();
}

module.exports = {
    authenticated
}