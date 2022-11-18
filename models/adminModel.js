
const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema ({
    _id:mongoose.Schema.Types.ObjectId,
    img: {
        imageUrl:String,
        public_id:String
    }

})

module.exports = mongoose.model("admin" , adminSchema)