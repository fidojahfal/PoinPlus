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
    jeniskelamin: {
        type: String,
        required: true
    },
    absen: {
        type: Number,
        required: true
    },
    point: {
        type: Number,
        default: 0
    }
});

const Admin = mongoose.model('admin', UserSchema);
module.exports = Admin;