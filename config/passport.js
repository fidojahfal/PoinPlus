const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

//Load User Model
const User = require('../models/user');

module.exports = function(passport){
    passport.use(
        new LocalStrategy({ usernameField: 'username', passwordField: 'password' },function (username, password, done) {
            //Match User
            User.findOne({ username: username })
            .then(user =>{
                if(!user){
                    return done(null,false, { message: 'Your username is not registered' })
                }
                //Match Password
                bcrypt.compare(password, user.password, (err, isMatch)=>{
                    if(err) throw err;
                    if(isMatch){
                        return done(null, user);
                    }else{
                        return done(null, false, { message: 'Password incorrect!' })
                    }
                });
            })
            .catch(err => console.log(err));
        })
    );
    passport.serializeUser((user, done) => {
        done(null, user.id);
      });
      
      passport.deserializeUser((id, done)=> {
        User.findById(id, (err, user)=> {
          done(err, user);
        });
      });
}