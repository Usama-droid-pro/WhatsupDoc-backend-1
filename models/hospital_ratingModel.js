
const mongoose =require("mongoose");

const hospital_rating = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    patient_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"patient"

    },
    hospital_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"hospital"
    },
    review:String,
    stars_rate:Number,
    
},
{
    timestamps:true
})

module.exports =mongoose.model("hospital_rating" , hospital_rating)