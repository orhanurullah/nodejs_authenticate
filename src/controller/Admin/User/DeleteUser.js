const UserService = require('../../../service/UserService');

const DeleteUser = async(req, res) => {
    const id = req.params.id;
    const UserServiceInstance = new UserService();
    await UserServiceInstance.delete(id).then(() => {
        res.status(200).json({
            error:false,
            message:'silme işlemi başarıyla tamamlandı.'
        });
    }).catch((err) => {
        console.log('silme tamamlanmadı');
        res.status(500).json({
            error:true,
            message:'Silme sırasında bir hata oluştu.' + err
        });
    })
}
module.exports = DeleteUser;