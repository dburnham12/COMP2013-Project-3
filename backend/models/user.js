const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Set up user schema
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

const User = mongoose.model("User", userSchema, "users");
module.exports = User; // Export user schema
