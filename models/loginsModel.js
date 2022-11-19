const mongoose = require("mongoose");

const loginsSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    table_name:{
        type:String,
        enum:["doctor" , "hospital" , "patient" , "admin"]
    },
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
    },
    status:{
        type:String,
        String:["blocked" , "active"],
        default:"active"
    },
    user_name:String,
    email:{
        type:String,
        min:6,
        max:255
    },
    password:{
        type:String,
        min:8,
        max:255
    },
    onlineStatus:Boolean,

},
{
    timestamps:true
})

module.exports = mongoose.model("login" , loginsSchema)