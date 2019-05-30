const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name : String,
    branch : String,
    registrationNo : Number
});

module.exports = mongoose.model('Student',studentSchema);