require('dotenv').config();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'epointimage',
    api_key: "577139366651962",
    api_secret: "JZrbz2R03w7aDIdEt2grR-9vzjE"
});

exports.cloudinary = cloudinary;