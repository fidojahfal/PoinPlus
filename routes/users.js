const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { ensureNotAutheticated } = require('../config/auth');
const cloudinaryFile = require('../utils/cloudinary');
var upload = require('../utils/multer')


//User models
const User = require('../models/user');
const Admin = require('../models/admin');
const Log = require('../models/log');
// const log = require('../models/log');
const passport = require('passport');
const { findById } = require('../models/user');


//Register
router.get('/register', ensureNotAutheticated, (req, res) => {
    var title = "Sign Up";
    res.render('register', {
        title: title
    });
});

//Register POST
router.post('/register', (req, res) => {
    var title = "Sign Up";
    const { name, jeniskelamin, kelas, jurusan, index, absen, username, password, password2 } = req.body;
    let errors = [];

    //check required fields
    if (!name || !jeniskelamin || !kelas || !jurusan || !index || !absen || !username || !password || !password2) {
        errors.push({ message: 'You must fill all this thing!' });
    }

    //Check Password match
    if (password !== password2) {
        errors.push({ message: 'Password is not match' });
    }

    //check Password length
    if (password.length < 8) {
        errors.push({ message: 'Your password is must minimal 8 character' });
    }

    if (username.length < 5) {
        errors.push({ message: 'Your username is must minimal 5 character' });
    }

    if (errors.length > 0) {
        res.render('register', {
            errors,
            name,
            kelas,
            jurusan,
            index,
            absen,
            username,
            password,
            password2,
            title: title
        });
    } else {
        //validation passed
        User.findOne({ username: username })
        Admin.findOne({ name: name } && { username: username })
            .then(user => {
                if (user) {
                    errors.push({ message: 'Name/Username is already taken!' })

                    res.render('register', {
                        errors,
                        name,
                        jeniskelamin,
                        kelas,
                        jurusan,
                        index,
                        absen,
                        username,
                        password,
                        password2,
                        title: title
                    });

                } else {
                    const newUser = new User({
                        name,
                        jeniskelamin,
                        username,
                        password,
                        kelas,
                        jurusan,
                        index,
                        absen
                    });

                    const newUser1 = new Admin({
                        name,
                        username,
                        jeniskelamin,
                        kelas,
                        jurusan,
                        index,
                        absen
                    });

                    //Hash Password
                    bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err)
                            throw err;

                        //set password to hash
                        newUser.password = hash;
                        //save the data
                        newUser.save()
                        newUser1.save()
                            .then(user => {
                                req.flash('success_message', 'Your account is registered now')
                                res.redirect('login');
                            })
                            .catch(err => {
                                console.log(err);
                            });

                        // .then(user =>{
                        //     req.flash('success_message', 'Your account is registered now')
                        //     res.redirect('login');
                        // })
                        // .catch(err =>{
                        //     console.log(err);
                        // });
                    }));
                }
            });
    }
});

//Login
router.get('/login', ensureNotAutheticated, (req, res) => {
    var title = "Login";
    res.render('login', {
        title: title
    });
});

//Login Post
router.post('/login', passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true
}), function(req, res) {
    var username = req.body.username
        // If this function gets called, authentication was successful.
        // `req.user` contains the authenticated user.
    User.findOne({ username: username }).exec(function(err, member) {
        if (member.role === "user") {
            res.redirect('/user/' + req.user.username);
        } else if (member.role === "admin") {
            res.redirect('/admin/' + req.user.username);
        }
    })
});

//Logout Handler
router.get('/logout', (req, res) => {
    req.logOut();
    req.flash('success_message', 'You are logged out');
    res.redirect('/login');
});


//Update Data
// router.post('/update',(req,res, next)=>{
//     Admin.updateOne({$inc: {"point": req.body.point2}},(err,docs)=>{
//         if(err){
//             console.log(err)
//         }else{
//             res.redirect('/admin/' + req.user.username)
//         }
//     })
// })

router.post('/update', (req, res, next) => {
    Admin.findByIdAndUpdate({ _id: req.body._id }, { $inc: { "point": req.body.point2 } }, (err, docs) => {
        if (err) {
            console.log(err)
        } else {
            const log = new Log();
            log.name = req.body.names
            log.add_point = req.body.point2;
            log.add_by = req.user.name
            log.save((err, docs) => {
                if (err) {
                    return console.log(err)
                } else {
                    res.redirect('/admin/' + req.user.username)
                }
            })

        }
    })
})

//User Profile Update
router.post('/profileUpdate', upload.upload.single('photo'), (req, res) => {
    console.log(req.file)
    if (!req.file) {
        return res.redirect('/')
    }
    cloudinaryFile.cloudinary.uploader.upload(req.file.path).then(function(data) {
        console.log(data.url)
        const temp = User.findByIdAndUpdate({ _id: req.body._id }, { $set: { image: data.url }, username: req.body.username })
        temp.exec((error, data) => {
            if (error) {
                console.log('error', error)
            } else {
                res.redirect('/')
            }
        })
    })

})




module.exports = router;