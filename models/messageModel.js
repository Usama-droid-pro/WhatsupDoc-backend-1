const mongoose = require("mongoose")

const MessageSchema = new mongoose.Schema(
  {
    _id:mongoose.Schema.Types.ObjectId,
    chatId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Chat"
      },
    to:{
      type:mongoose.Schema.Types.ObjectId,
    },
    from:{
      type:mongoose.Schema.Types.ObjectId,
    },
    to_table_name:{
      type:String,
      enum:["hospital","patient","doctor","admin"]
    },
    from_table_name:{
      type:String,
      enum:["hospital","patient","doctor","admin"]
    },
    msg_type:{
      type: String,
      enum:["text" , "image" , "video"]
    },
    public_id:String,
    message:String,
  },
  {
    timestamps: true,
  }
);

const MessageModel = mongoose.model("Message", MessageSchema);
module.exports = MessageModel
