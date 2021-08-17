const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    emal: {
        type: String,
        required: true
    },
    phone: Number,
    age: Number,

});

module.exports = mongoose.model("User", userSchema)