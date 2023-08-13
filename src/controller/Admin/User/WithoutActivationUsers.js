const UserService = require('../../../service/UserService');


const WithoutActivationUsers = async (req, res) => {
    const UserServiceInstance = new UserService();
    const users = await UserServiceInstance.list({
        activation: false
    });
    if (!users || !users.length > 0) {
        return res.status(200).json({
            error: false,
            message: 'Aktivasyon bekleyen kullanıcı bulunmamaktadır'
        });
    }
    return res.status(200).json({
        error: false,
        message: 'Kullanıcı aktivasyonu tamamlanmamış kullanıcılar listelenmiştir.',
        users: users
    });
}

module.exports = WithoutActivationUsers;