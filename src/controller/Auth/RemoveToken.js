const UserService = require("../../service/UserService");

const removeToken = async (req, res) => {
    try {
        const refreshToken = req.cookie('refresh');
        if (!refreshToken) {
            res.status(400).json({
                error: true,
                message: 'refresh token bulunamadı'
            });
        }
        const UserServiceInstance = new UserService();
        const user = await UserServiceInstance.getOne({
            token: refreshToken
        });
        if (!user.token) {
            return res.status(400).json({
                error: true,
                message: 'Geçerli bir oturum bulunamadı.'
            });
        }
        user.token = null;
        await user.save();
        res.status(204).json({
            error: false,
            message: 'Refresh token başarıyla silindi.'
        })
    } catch (err) {
        res.status(500).json({
            error: true,
            message: "Sunucu hatası var!"
        })
    }
}

module.exports = removeToken;