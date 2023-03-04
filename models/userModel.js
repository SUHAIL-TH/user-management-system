const mongoose = require("mongoose")

const userSchema = new mongoose.Schema (
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            trim: true
        },
        phone: {
            type: Number,
            unique: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            trim: true,
        }
    }
) 

const user = mongoose.model('user', userSchema);
module.exports = user