
const mongoose = require("mongoose")

const doctorSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    hospital_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"hospital"
    },
    department_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"department"
    },
    profile_img:{
        type:Object
    },
    subscription_history_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"subscriptionHistory"
    },
    full_name:String,
    last_degree_title:String,
    last_degree_from:String,
    doc_id_card_photo_back:{
        type:Object
    },
    doc_id_card_photo_front:{
        type:Object
    },
    gender:{
        type:String,
        enum:["male" ,"female" , "other"]
    },
    age:Number,
    appointment_fee:String,
    experience:String,
    id_card_photo_back:{
        type:Object
    },
    id_card_photo_front:{
        type:Object
    },
    phone_no:String,
    paypal_email:String,

}, {
    timestamps:true,
})

module.exports = mongoose.model ("doctor" , doctorSchema)