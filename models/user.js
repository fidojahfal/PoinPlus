const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const UserSchema = new Schema({
    name: {
        type: String,
        uppercase: true,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    kelas: {
        type: Number,
        required: true
    },
    jurusan: {
        type: String,
        required: true
    },
    index: {
        type: Number,
        required: true
    },
    absen: {
        type: Number,
        required: true
    },
    jeniskelamin: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: "https://res.cloudinary.com/epointimage/image/upload/v1604557270/kosongan_a2rhrc.png"
    },
    role: {
        type: String,
        default: "user"
    },
    date: {
        type: Date,
        default: Date.now
    }
});


const User = mongoose.model('user', UserSchema);
module.exports = User;