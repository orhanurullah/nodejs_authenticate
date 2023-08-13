
const activation = async (req, res, next) => {
    const user = req.user;
    if (!user.activation) {
        return res.status(500).json({
            error: true,
            message: 'Yöneticinin aktivasyon işlemini tamamlaması bekleniyor... <br />Bir süre sonra tekrar deneyebilirsiniz.'
        });
    }
    next();
}

module.exports = {
    activation
}