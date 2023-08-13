const admin = async (req, res, next) => {
    const role = req.user.role;

     if (!role === 'admin') {
        return res.status(403).json({
            error: true,
            message: 'Yetkili değilsiniz. Devam edemezsiniz.'
        });
     } 
     next();

}
module.exports = {
    admin
}