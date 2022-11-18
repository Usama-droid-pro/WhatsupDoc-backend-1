
const mongoose = require("mongoose")

const hospitalTypeSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:String,
}, {
    timestamps:true,
})

module.exports = mongoose.model ("hospital_type" , hospitalTypeSchema)