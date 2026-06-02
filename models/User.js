//import mongoose
const mongoose = require("mongoose");

//create schema
const UserSchema = mongoose.Schema(
    {
        fullname: {
            type: String,
            required: [true, 'Full name is required'],
            trim: true,
        },
        username: {
            type: String,
            unique: true,
            required: [true, 'username is required'],
            trim: true,
            lowercase: true,
            match: [/^[a-zA-Z0-9]+$/, 'Username must be alpha-numeric'],
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
        },
    }, 
        {timestamps: true },
    );

    //Export the user schema
    module.exports = mongoose.model('User',UserSchema);