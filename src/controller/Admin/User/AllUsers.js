const UserService  = require('../../../service/UserService');

const AllUsers = async(req, res) => {
    const UserServiceInstance = new UserService();
    const users = await UserServiceInstance.list();
    if(users.length < 1){
        return res.status(500).json({
            error:true,
            message:'Henüz kullanıcı yok yada bir hata oluştu.'
        });
    }
    return res.status(200).json({
        error:false,
        message:'Kullanıcılar listelendi',
        users:users
    });
}

module.exports = AllUsers;