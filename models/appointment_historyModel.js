
const mongoose = require("mongoose")

const appointmentHistorySchema= new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    appointment_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"appointment"
    },
    transaction_id:String,
    table_name_to:{
        type:String,
        enum:["hospital", "patient","doctor" , "admin"],
    },
    table_name_from:{
        type:String,
        enum:["hospital", "patient","doctor" , "admin"],
    },
    transaction_status:{
        type:String,
        enum:["success", "failed"],
    },

})

module.exports = mongoose.model("appointment_history", appointmentHistorySchema);