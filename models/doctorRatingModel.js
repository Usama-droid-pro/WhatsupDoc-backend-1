
const mongoose =require("mongoose");

const doctor_rating = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    patient_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"patient"
    },
    doctor_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"doctor"
    },
    review:String,
    stars_rate:Number,
},
{
    timestamps:true
})

module.exports =mongoose.model("doctor_rating" , doctor_rating)