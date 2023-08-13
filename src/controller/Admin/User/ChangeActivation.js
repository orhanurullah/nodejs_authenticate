const UserService = require('../../../service/UserService');


const ChangeActivation = async (req, res) => {
   const id = req.params.id;
   const UserServiceInstance = new UserService();
   const user = await UserServiceInstance.getOne({_id:id});
   if(!user){
    return res.status(404).json({
        error:true,
        message:'Bu kimlikle bir kullanıcı yoktur.'
    });
   }
   await user.changeActivation();
   const control = await user.save();
   if(control){
        return res.status(200).json({
            error:false,
            message: 'Kullanıcı aktivasyonu gerçekleşti.'
        });
   }else{
    return res.status(404).json({
        error:true,
        message: 'Kullanıcı aktivasyonu tamamlanamadı. Bilinmeyen bir hata oluştu'
    });
   }
}

module.exports = ChangeActivation;