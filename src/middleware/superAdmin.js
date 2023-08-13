
const superAdmin = async (req, res, next) => {
    const user = req.user;
    if (!user || (user.role !== 'super-admin' && user.email !== process.env.ADMIN)) {
        return res.status(403).json({
            error: true,
            message: 'Yetkili değilsiniz. Devam edemezsiniz.'
        });
    }
    next();
}

module.exports = {
    superAdmin
}
