
const mongoose = require("mongoose")

const patientSchema= new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:String,
    img:{
        type:Object,
    },
    phone_no:String,
    gender:{
        type:String,
        enum:["male","female" ,"other"]
    },
    city:String,
    state:String,
    zip_code:String,
    country:String,
    street_address:String,
    locationAddress:String,
    location: {
        type: { 
         type: String,
         default: "Point"
       },
        coordinates: {
          type: [Number], 
         required: [true, "Coordinates are required"] 
       } 
     },
     health_condition:String,
     major_disease:Boolean,
     social_security_no:String,
     profession_status:Boolean, 
     age:Number
})

module.exports= mongoose.model("patient" , patientSchema)