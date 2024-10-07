const mongoose = require('mongoose');
const BookSchema = new mongoose.Schema({
    title:{
        type: String,
    },
    author:{
        type:String,
    },
    description:{
        type:String,
    },
    publicationYear:{
        type:Number,
    },
    ISBN:{
        type:String,
    }
})
module.exports = mongoose.model('book', BookSchema)