if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const session = require('express-session');
// const auditLog = require('audit-log');
const app = express();
const path = require('path');
const expressLayout = require('express-ejs-layouts');
const passport = require('passport');
const { title } = require('process');
// const IN_PROD = NODE_ENV === 'production'

//Passport config
require('./config/passport')(passport);

//DB Config
const db = require('./config/keys').MongoURI;

//Connect Mongo
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => {
        console.log('Connected to database');
    })
    .catch(err => {
        console.log(err);
    });
// auditLog.addTransport('mongoose', {connectionString: db});
// auditLog.addTransport('console')

//Body-parser
app.use(express.urlencoded({ extended: false }));

//EJS
app.use(expressLayout);
app.use(express.static(path.join(__dirname + '/views/public')));
app.use(express.static(path.join('../picturedemo/')));
app.set('view engine', 'ejs');


//Express Session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Connect Flash
app.use(flash());

//Global Vars
app.use((req, res, next) => {
    res.locals.success_message = req.flash('success_message');
    res.locals.error_message = req.flash('error_message');
    res.locals.error = req.flash('error');
    next();

});


//Routes
app.use('/', require('./routes/dashboard'));
app.use('/', require('./routes/users'));
app.use((req, res, next) => {
    const title = "404 not found"
    res.status(404)
    res.render('404', { title: title })
})
app.listen(3000,
    console.log('Server start at port 3000'));