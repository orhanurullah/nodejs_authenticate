const UserService = require('../../../service/UserService');


const AllActiveUsers = async (req, res) => {
    const UserServiceInstance = new UserService();
    const users = await UserServiceInstance.list({activation:true, role:['user', 'admin']});
    if (!users || !users.length > 0) {
        return res.status(200).json({
            error: false,
            message: 'Aktif kullanıcı bulunmamaktadır'
        });
    } 
    return res.status(200).json({
        error: false,
        message: 'Kullanıcı aktivasyonu tamamlanmış kullanıcılar listelenmiştir.',
        users:users
    });
}

module.exports = AllActiveUsers;