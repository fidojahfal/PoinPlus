const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const logSchema = new Schema({
    name: {
        type: String,
        uppercase: true,
        required: true
    },
    add_point: {
        type: String,
        required: true
    },
    add_by: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});


const Log = mongoose.model('log', logSchema);
module.exports = Log;