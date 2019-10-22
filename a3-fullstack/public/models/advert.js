let mongoose = require('mongoose');

let advertSchema = new mongoose.Schema({
    id: String,
    department: String,
    course: Number,
    details: String,
    email: String,
});

module.exports = mongoose.model("advert", advertSchema);