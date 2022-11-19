
const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    to:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"login"
    } ,
    from:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    table_name_to:{
        type:String,
        enum:["hospital" , "patient" , "doctor" , "admin"]
    },
    table_name_from:{
        type:String,
        enum:["hospital" , "patient" , "doctor" , "admin"]
    },

    details: String,
    status:{
        type:String, 
        enum:["read", "unread"],
        default:"unread"
    },
})

module.exports = mongoose.model("notification" , notificationSchema)