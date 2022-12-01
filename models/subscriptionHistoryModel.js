
const mongoose = require("mongoose")

const subscriptionHistory = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    subscription_rate_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"subscription_rate"
    },
    month_name:{
        type:String,
        enum:["january","february","march","april","may","june","july",
        "august","september","october","november","december"]
    },
    transaction_id:{
        type:String
    },
    transaction_status:{
        type:String,
        enum:["success","failed",]
    },
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
    },
    table_name:{
        type:String,
        enum:["doctor" , "hospital" ,"patient"]
    }

},{
    timestamps:true
})

module.exports = mongoose.model("subscriptionHistory" , subscriptionHistory)