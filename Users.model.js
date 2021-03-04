const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    name: {
        type: String,
        unique: false,
        lowercase: true,
        required: true,
        min: 4,
        max: 15
    },
    age: {
        type: String,
        required: true,
        min: 4,
        max: 15
    },
    gender: {
        type: String,
        required: true,
        min: 4,
        max: 15
    },
    okwithdogs: {
        type:  Boolean
    },
    okwithcats: {
        type:  Boolean
    },
    okwithchild: {
        type:  Boolean
    },
    date: {
        type: Date,
        default: Date.now()
    }
  
})

module.exports = mongoose.model('User', UserSchema);