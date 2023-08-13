const sendEmail = require('./events/sendEmail');
const createAndVerifyToken = require('./createAndVerifyToken');

const sendEmailVerifyMail = async(user) => {
    const token = await createAndVerifyToken.createToken({
        id: user._id
    }, process.env.EMAIL_SECRET_KEY, process.env.EMAIL_KEY_EXPIRES_IN);
    const option = {
        email: user.email,
        subject: 'Kayıt Tamamlama İşlemi',
        text: 'Kaydınızı tamamlayın.',
        html: `<div>
                    <div style="border:1px solid grey; background-color:brown; color:white;">
                        <h2>Lütfen kaydınızı tamamlamak için 6 saat içinde aşağıdaki linke tıklayın</h2>
                    
                        <a style="background-color:green; color:white;" href="http://localhost:3000/auth/verify-email/${token}">Email Doğrula</a>
                    </div>
                    <div>
                        <p>Yukarıdaki link artık aktif değilse mail ile yeni link almak için aşağıdaki bağlantıya tıklayın.</p>
                        <a href='http://localhost:3000/auth/refresh-verify-email/${user._id}' style='background-color:brown; color:white; padding:15px; margin:auto; border-radius:8px;'>Yeni Mail Gönder
                    </a>
                </div>
            </div>`
    }
    await sendEmail(option);
}

module.exports = sendEmailVerifyMail;