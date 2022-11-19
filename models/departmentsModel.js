const mongoose =require("mongoose");

const departmentSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    images:[{
        imgUrl:String,
        public_id:String
    }],
    hospital_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"hospital"

    },
    name:String,
    opening_time:String,
    closing_time:String,
    description: String,
    profile_img:{
        imgUrl:String,
        public_id:String
    }
},
{
    timestamps:true
})

module.exports =mongoose.model("department" , departmentSchema)