const subscriber = (section) => {
    return (req, res, next) => {
        if(req.user.role == 'super-admin' || req.user.subscribers.includes(section)){
            next();
        }else{
            res.status(403).json({
                error: true,
                message: ` ${section} için aboneliğiniz yoktur. Devam edemezsiniz. Abonelik talebi yapmanız gerekir.`
            });
        }
    }
}
module.exports = subscriber;