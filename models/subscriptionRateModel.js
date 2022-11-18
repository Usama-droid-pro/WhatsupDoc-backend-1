const mongoose= require('mongoose')

const subscriptionRateSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:String,
    pkg_for: {
        type:String,
        enum: ["doctor" , "hospital"]
    },
    rate:String,
},{
    timestamps:true
})

module.exports = mongoose.model("subscription_rate" , subscriptionRateSchema)