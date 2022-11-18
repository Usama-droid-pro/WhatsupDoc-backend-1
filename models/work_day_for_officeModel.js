

const mongoose = require("mongoose");

const work_day_for_officeSchema = new mongoose.Schema ({
    _id:mongoose.Schema.Types.ObjectId,
    doc_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"doctor"
    },
    day:{
        type:String,
        enum:["sunday" , "monday" , "tuesday" , "wednesday" , "thursday" , "friday" , "saturday"],
    },
    type_of_work:{
        type:String,
        enum:["onsite" , "video"]
    },
},
{
    timestamps:true,
})

module.exports = mongoose.model("work_day_for_office" , work_day_for_officeSchema)