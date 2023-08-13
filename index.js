require('./src/config');
require('./src/config/database').connect();
const express = require('express');
const session = require('express-session');
const path = require("path");
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');

//Routes
const { authRoute, userRoute, publicRoute, superRoute  } = require('./src/route');
//End Routes
const app = express();

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'SECRET'
  }));
  
  app.use(passport.initialize());
  app.use(passport.session());
// const corsOptions = {
//     origin: "http://localhost:8081"
// }
//Middlewares
app.use(helmet());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use(cookieParser());


app.use('/', publicRoute);//without middlewares
app.use('/auth', authRoute);//authenticated middleware using
app.use('/user', userRoute);//auth middleware using
app.use('/manager', superRoute);//super-admin and auth middleware using


app.listen(process.env.APP_PORT || 8000, () => {
    console.log(`${process.env.APP_PORT} portu üzerinde Server çalıştı`);
});