const { name } = require('ejs');
const express = require('express');
const router = express.Router();
const { ensureAutheticated, ensureIsAutheticated } = require('../config/auth');
const Admin = require('../models/admin');
const Log = require('../models/log')
    // const log = require('../models/log');
const User = require('../models/user');
const collection = Admin.find({}).sort({ "kelas": 1, "index": 1, "absen": 1 });



router.get('/', ensureIsAutheticated, (req, res, next) => {
    var username = req.user.username
    User.findOne({ username: username }).exec(function(err, member) {
        if (member.role === "user") {
            res.redirect('/user/' + req.user.username);
        } else {
            res.redirect('/admin/' + req.user.username);
        }
    })
});

router.get('/admin/:username/', ensureAutheticated, (req, res, next) => {
    var title = "Halaman Admin"
    collection.exec(function(err, data) {
        if (err) throw err;
        res.render('admin', {
            records: data,
            kelas: req.body.filterKelas,
            jurusan: req.body.filterJurusan,
            index: req.body.filterIndex,
            nama: req.user.name,
            username: req.user.username,
            image: req.user.image,
            title: title
        });
    });

});

router.get('/user/:username', ensureAutheticated, (req, res) => {
    var title = req.user.name
    var username = req.params.username
    Admin.findOne({ username }).exec(function(err, member) {
        if (err) {
            console.log(err)
        } else {
            Log.find({ name: req.user.name }).exec(function(err, data) {
                if (err) {
                    console.log(err)
                } else {
                    res.render('dashboard', {
                        name: req.user.name,
                        by: data.name,
                        username: req.user.username,
                        roles: req.user.roles,
                        kelas: req.user.kelas,
                        _id: req.user._id,
                        jurusan: req.user.jurusan,
                        index: req.user.index,
                        absen: req.user.absen,
                        image: req.user.image,
                        jeniskelamin: member.jeniskelamin,
                        poin: member.point,
                        data: data,
                        title: title
                    })
                    console.log(data)
                    console.log(req.headers.cookie)

                }
            })
        };

    });
});

router.post('/admin/:username', (req, res) => {
    var title = "Halaman Admin";
    var filterKelas = req.body.kelas
    var filterJurusan = req.body.jurusan
    var filterIndex = req.body.index

    if (filterKelas != '' && filterJurusan != '' && filterIndex != '') {
        var filterParameter = { $and: [{ kelas: filterKelas }, { jurusan: filterJurusan }, { index: filterIndex }] }
    } else if (filterJurusan == '') {
        var filterParameter = { $and: [{ kelas: filterKelas }, { index: filterIndex }] }
    } else if (filterKelas == '') {
        var filterParameter = { $and: [{ jurusan: filterJurusan }, { index: filterIndex }] }
    } else if (filterIndex == '') {
        var filterParameter = { $and: [{ kelas: filterKelas }, { jurusan: filterJurusan }] }
    } else {
        var filterParameter = {}
    }
    const collectionFilter = Admin.find(filterParameter).sort({ "kelas": 1, "index": 1, "absen": 1 });
    collectionFilter.exec(function(err, data) {
        if (err) throw err;
        res.render('admin', {
            records: data,
            kelas: req.body.kelas,
            username: req.user.username,
            jurusan: req.body.jurusan,
            index: req.body.index,
            username: req.user.username,
            nama: req.user.name,
            image: req.user.image,
            title: title,
        });
    });

});

router.get('/admin/:username/:_id', (req, res, next) => {
    var title = "Add Point"
    Admin.findOne({ _id: req.params._id }, req.body, { new: true }, (err, docs) => {
        if (err) {
            next(err);
        } else {
            res.render('poin', {
                user: docs,
                title: title
            });
        }
    });
});

router.get('/user/:username/update/:_id', (req, res, next) => {
    var title = "Edit Profile"
    User.findOne({ _id: req.params._id }, req.body, { new: true }, (err, docs) => {
        if (err) {
            next(err);
        } else {
            res.render('update', {
                user: docs,
                title: title,
                _id: req.params._id
            });
        }
    });
});

// router.get('/dashboard/:username/history', (req, res) => {
//     let date = new Date()
//     log.find({ userId: req.params.username})
//       .exec(res.json(e))
//   });


module.exports = router;