const mongoose = require('mongoose');
const loginSchema = new mongoose.Schema({
    name:{
        type: String,
    },
    password:{
        type:String,
    },
})
module.exports = mongoose.model('login', loginSchema)
