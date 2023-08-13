const UserService = require('../../../service/UserService');

const RemoveSubscribe = async (req, res) => {
    if(!req.params?.id){
        return res.status(404).json({
            error:true,
            message:'id gereklidir'
        });
   }
   const id = req.params.id;
    if(!req.query?.section || (req.query?.section == null || req.query?.section == undefined)){
            return res.status(404).json({
                error:true,
                message:'abonelik başlık bilgisi gereklidir.'
            });
   }
   const section = req.query.section;
   const UserServiceInstance = new UserService();
   const user = await UserServiceInstance.getOne({_id:id});
   if(!user){
    return res.status(404).json({
        error:true,
        message:'Bu kimlikle bir kullanıcı yoktur.'
    });
   }
   await user.removeSubscribe(section);
   const control = await user.save();
   if(control){
        return res.status(200).json({
            error:false,
            message: 'Kullanıcı için abonelik başarıyla silindi.'
        });
   }else{
    return res.status(404).json({
        error:true,
        message: 'Kullanıcı için abonelik silme işlemi tamamlanamadı. Bilinmeyen bir hata oluştu'
    });
   }
}

module.exports = RemoveSubscribe;