const Mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {
    generateTokens
} = require('../utils/generateTokens');
const BaseLogger = require('../logger/BaseLogger');

const Schema = Mongoose.Schema;

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: [true, 'Lütfen isminizi girin'],
        maxLength: 100,
        minLength: 3
    },
    lastName: {
        type: String,
        required: [true, 'Lüften soyisminizi girin'],
        maxLength: 150,
        minLength: 2
    },
    email: {
        type: String,
        required: [true, 'Lüften email adresinizi eksiksiz olarak girin'],
        unique: [true, 'Email Tekrari'],
        maxLength: 255,
        minLength: 5
    },
    password: {
        type: String,
        required: [true, 'Lüften şifrenizi 5-255 karakter aralığında girin'],
        maxLength: 255,
        minLength: 5,
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'super-admin'],
        default: 'user'
    },
    subscribers:[],
    profile_image:{
        type:String,
        default:"/default_image"
    },
    activation: {
        type: Boolean,
        default: false
    },
    addresses: [],
    phoneNumbers:[],
}, {
    timestamps: true,
    versionKey: false
});
//kullanıcı eklenmeden önce gerekli değişiklikler yapılır.
UserSchema.pre('save', async function (next) {

    if (this.email === process.env.ADMIN) {
        this.role = 'super-admin';
        this.activation = true;
    }
    next();
});
//kullanıcı kayıt edildikten sonra loglama yapar.
UserSchema.post("save", (doc) => {
    //Kayıt edilmiştir loglama
    const logger = BaseLogger('info', 'user');
    logger.log({level:'info', message:`${doc.email} mailine sahip kullanıcının kaydı yapıldı. ${new Date()}`});

});
//kullanıcının passwordunu kontrol eder
UserSchema.methods.comparePassword = async function (password) {
    const hashPass = await bcrypt.hash(password, 10);
    console.log('hash pass: ', hashPass);
    const result = await bcrypt.compare(password, this.password).then(res => {
        return res;
    }).catch(err => err);
    return result;
}
// //Token ekler.
// UserSchema.methods.addToken = async function (token) {
//     this.token = token;
// }
//utils dosyasından token üreten fonksiyonu çağırır.
UserSchema.methods.tokenGenerator = async function () {
    const user = this;
    return {
        accessToken,
        refreshToken
    } = await generateTokens(user);
}
//kullanıcının aktivasyonunu değiştirir
UserSchema.methods.changeActivation = async function () {
    this.activation = true;
}

//Kullanıcının aktivasyonunu kontrol eder. true or false
UserSchema.methods.checkActivation = async function () {
    return await this.activation;
}
UserSchema.methods.addSubscribe = async function(subscribe){
    this.subscribers.push(subscribe);
}
UserSchema.methods.removeSubscribe = async function(subscribe){
    this.subscribers.remove(subscribe);
}

module.exports = Mongoose.model('User', UserSchema);