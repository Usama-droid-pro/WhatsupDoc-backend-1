
const mongoose = require("mongoose")

const appointment_Schema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    bookedby_patient_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"patient"
    },
    type_of_work:{
        type:String,
        
    },
    for_yourself:Boolean,
    disease:String,
    description:String,
    images:[Object],
    for_other:Boolean,
    other_patient_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"other_patient_detail"
    },
    doctor_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"doctor"
    },
    work_day_for_office_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"work_day_for_office"
    },
    work_day_for_office_timing_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"work_day_for_office_timing"
    },
    status:{
        type:String,
        enum:["scheduled", "cancelled" , "completed"]
    }
    ,
    review:String,
    rating_stars:String,
    createdAt:{
        type:String,
        default:date()
    },
    appointment_date:String,
    appointmentNumber:String,

},)

module.exports = mongoose.model("appointment" , appointment_Schema);


function date(){
    const currentDate = new Date(Date.now());
    return  currentDate.toLocaleDateString('en-CA')

}