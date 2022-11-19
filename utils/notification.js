
const notificationModel = require("../models/notificationModel");
const loginsModel = require("../models/loginsModel");
const mongoose = require("mongoose");

async function notification (to , from  , details , table_name_to  ,table_name_from ){

    console.log(to + from + details + table_name_to + table_name_from)

    if(table_name_to==="admin")
    {
        const admin=await loginsModel.findOne({table_name:"admin"});
        to=admin._id;
    }
        const notification  = new notificationModel({
            _id:mongoose.Types.ObjectId(),
            to:to,
            from:from,
            details:details,
            table_name_to:table_name_to,
            table_name_from:table_name_from
            })

            const result = await notification.save();

            if(result){
                return true
            }
            else{
                return false
            }
}

module.exports = notification;