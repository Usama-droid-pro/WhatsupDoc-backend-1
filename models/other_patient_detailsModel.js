
const mongoose= require("mongoose")

const other_patient_details = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:String,
    gender:{
        type:String,
        enum:["male" ,"female" , "other"],
    },
    age:Number,
    relation_with_patient:String,

})

module.exports = mongoose.model("other_patient_detail" , other_patient_details);