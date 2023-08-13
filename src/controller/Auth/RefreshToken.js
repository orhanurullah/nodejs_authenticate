const {
    generateTokens
} = require('../../utils/generateTokens');

const JWT = require('jsonwebtoken');
const UserService = require('../../service/UserService');
const { addTokenToBlackList, hasTheTokenInBlackList } = require('../../utils/blacklist');

const refreshToken = async (req, res) => {
    const token = req.body.token;
    const actoken = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            error: true,
            message: 'Yenileme jetonu bulunamadı.'
        });
    }
    //Token eşleşmesi yapılıyor.
    JWT.verify(token, process.env.REFRESH_TOKEN_SECRET_KEY, async (err, data) => {
        if (err) {
            return res.status(400).json({
                error: true,
                message: 'Refresh token geçerli değil'
            });
        }
        const id = data.id;
        const UserServiceInstance = new UserService();
        const user = await UserServiceInstance.getOne({
            _id: id
        });
        const {
            accessToken,
            refreshToken
        } = await generateTokens(user);
        await addTokenToBlackList(token);
        await addTokenToBlackList(actoken);
        return res.status(200).json({
            error: false,
            message: 'Yeni tokenlar başarıyla oluşturuldu.',
            accessToken,
            refreshToken
        });
    })
}
module.exports = refreshToken;