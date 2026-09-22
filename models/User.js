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
        role: {
            type: String,
            enum: ['learner', 'user', 'admin'],
            default: 'learner',
        },
        proficiency: {
            type: String,
            enum: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
            default: 'A1',
        },
    }, 
        {timestamps: true },
    );

    //Export the user schema
    module.exports = mongoose.model('User',UserSchema);