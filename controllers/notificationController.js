const mongoose= require('mongoose');
const notificationModel= require("../models/notificationModel");
const notification = require('../utils/notification');
var ObjectId = require('mongodb').ObjectId;


exports.createNotification= async (req,res)=>{
    try{
        const to= req.body.to;
        const from = req.body.from;
        const details = req.body.details;
        const table_name_to = req.body.table_name_to;
        const table_name_from = req.body.table_name_from;

        const newNotification = new notificationModel({
            _id:mongoose.Types.ObjectId(),
            to:to,
            from:from,
            details:details,
            table_name_to:table_name_to,
            table_name_from :table_name_from,

        })

        const result = await newNotification.save();

        if(result){
            res.json({
                message: "Notification saved successfully",
                result:result,
                statusCode: 201
                
            })
        }
        else{
            res.json({
                message: "Notification could not be saved successfully",
                result:null,
                statusCode:400
            })
        }


    }
    catch(err){
        res.json({
            message: "Error ",
            error:err.message
        })
    }
}



exports.getAllNotifications = async (req,res)=>{

    try{  
    
    let result = notificationModel.aggregate([
        {
            $lookup:{
                from: "hospitals",
                localField:"from",
                foreignField:"_id",
                as : "from_hospital_info"
                
            }
        }, 
        {
            $lookup:{
                from: "doctors",
                localField:"from",
                foreignField:"_id",
                as : "from-doctor_info"
                
            }
        }, 
        {
            $lookup:{
                from: "patients",
                localField:"from",
                foreignField:"_id",
                as : "from_patient-info"
                
            }
        },
       
        
    ])

    if(result){
        result=(await result).reverse();
        res.json({
            message: "All notifications fetched successfully",
            result: result,
            statusCode: 200
        })
    }
    else{
        res.json({
            message: "could not fetch"
        })
    }
    }
    catch(err){
        res.json({
            message: "Error occurred while fetching",
            error:err.message
        })
    }
    
}

exports.getNotificationByReceiverId = async (req,res)=>{
    try{
        var receiverId = req.body.receiverId;
        receiverId = new ObjectId(receiverId);
        console.log(receiverId);
        const table_name_to = req.body.table_name_to;

        let result =notificationModel.aggregate([
            {
                $match:{to:receiverId , table_name_to:table_name_to}
            },

            {
                $lookup:{
                    from: "hospitals",
                    localField:"from",
                    foreignField:"_id",
                    as : "from_hospital_info"
                    
                }
            }, 
            {
                $lookup:{
                    from: "doctors",
                    localField:"from",
                    foreignField:"_id",
                    as : "from-doctor_info"
                    
                }
            }, 
            {
                $lookup:{
                    from: "patients",
                    localField:"from",
                    foreignField:"_id",
                    as : "from_patient-info"
                    
                }
            },
            
        
       
        
    ])
        if(result){
        result=(await result).reverse();
        res.json({
            message: "Notifications for :"+table_name_to+" fetched successfully",
            result: result,
            statusCode: 200
        })
        }
        else{
            res.json({
            message: "could not fetch"
        })
        }
        }

        catch(err){
        res.json({
            message: "Error occurred while fetching",
            error:err.message
        })
        }
    
    }

    exports.changeNotificationStatus = async (req,res)=>{
        try{
            const notification_id = req.body.notification_id;   
            const status = req.body.status;        
            let result =await notificationModel.findOneAndUpdate({_id: notification_id} , {status:status} , {new:true});
    
            if(result){
            res.json({
                message: `Notification Status changed to : ${status}`,
                result: result,
                statusCode: 200
            })
            }
            else{
                res.json({
                message: "could not change status , notification with this id may not found"
            })
            }
            }
    
            catch(err){
            res.json({
                message: "Error occurred while changing status",
                error:err.message
            })
            }
        
        }

        exports.changeAllNotificationStatus = async (req,res)=>{
            try{   
                const status = req.body.status;   
                const receiverId = req.body.receiverId;     
                let result = await notificationModel.updateMany({to:receiverId} , {status:status});
        
                if(result){
                res.json({
                    message: ` all Notification Status changed to : ${status}`,
                    result: result,
                    statusCode: 200
                })
                }
                else{
                    res.json({
                    message: "could not change status "
                })
                }
                }
        
                catch(err){
                res.json({
                    message: "Error occurred while changing status",
                    error:err.message
                })
                }
            
            }

    
      exports.deleteNotification =async  (req,res)=>{
        try{
            const notification_id = req.params.notification_id
            const result = await notificationModel.deleteOne({_id:notification_id})
            
            if(result.deletedCount>0){
                res.json({
                    message: `Notification deleted`,
                    result: result,
                    statusCode: 200
                })
            }
            else{
                res.json({
                    message: `Notification could not delete to`,
                    result: null,
                })
            }
        }
        catch(err){
            res.json({
                message: "error",
                error:err.message
            })
        }
      }
