const mongoose = require('mongoose');

const { MONGO_URI } = process.env;

exports.connect = async () => {
   await mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log('successfully connected to database at MongoDB Atlas');
    }).catch((error) => {
        console.log('database connection failed, exiting now...', error);
        process.exit(1);
    });
};
