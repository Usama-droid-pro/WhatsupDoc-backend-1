const mongoose = require('mongoose')

const hospitalSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    hospital_type_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"hospital_type"
    },
    subscription_history_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"subscriptionHistory"
    },
    name:String,
    profile_img:{
      imgUrl:String,
      public_id:String,

    },
    img:[{
        img_url:String,
        public_id:String
    }],
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
     hospital_owner:String,
     official_email:String,
     official_contact:String,
     opening_time:String,
     closing_time:String,
     website_or_social_link:String,

})

module.exports = mongoose.model("hospital" , hospitalSchema)
