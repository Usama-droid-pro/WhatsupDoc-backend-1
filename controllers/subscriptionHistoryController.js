
const mongoose = require("mongoose")
const subscriptionHistoryModel = require("../models/subscriptionHistoryModel")
const ObjectId = require("mongodb").ObjectId;


exports.createSubscriptionHistory = async(req,res)=>{
    try{
        const subscription_rate_id= req.body.subscription_rate_id;
        const month_name = req.body.month_name;
        const transaction_id= req.body.transaction_id;
        const transaction_status= req.body.transaction_status;
        

        const subscriptionHistory = new subscriptionHistoryModel({
            _id:mongoose.Types.ObjectId(),
            subscription_rate_id,
            month_name,
            transaction_id,
            transaction_status,
            user_id:req.body.user_id,
            table_name:req.body.table_name,
        })

        const result= await subscriptionHistory.save();
        
        if(result){
            res.json({
                message: "Subscription history saved successfully",
                result:result,
                statusCode:201
            })
        }
        else{
            res.json({
                message: "could not save subscription history",
                result:result,
                statusCode:400
            })
        }

        

    }
    catch(err){
        res.json({
            message: "Error occurred while saving subscription history",
            error:err.message
        })
    }
}



exports.getAllSubscriptionsHistories = async (req,res)=>{
    try{
        const result=await subscriptionHistoryModel.find({}).populate("subscription_rate_id");

        if(result){
            res.json({
                message: "result",
                result:result,
                statusCode:200
            })
        }
        else{
            res.json({
                message: "could not find result",
                result:result,
                statusCode:404
            })
        }
    }
    catch(err){
        res.json({
            message: "Error occurred while fetching",
            error:err.message,
            statusCode:500
        })
    }
}

exports.getSubscriptionHistoryById = async (req,res)=>{
    try{
        const subscriptionHistoryId= req.params.subscriptionHistoryId;
        const result=await subscriptionHistoryModel.findOne({_id:subscriptionHistoryId}).populate("subscription_rate_id");

        if(result){
            res.json({
                message: "result",
                result:result,
                statusCode:200
            })
        }
        else{
            res.json({
                message: "could not find result  with this id",
                result:result,
                statusCode:404
            })
        }
    }
    catch(err){
        res.json({
            message: "Error occurred while fetching",
            error:err.message,
            statusCode:500
        })
    }
}

exports.deleteSubscriptionHistory = async(req,res)=>{

    try{
        const subscriptionHistoryId= req.params.subscriptionHistoryId;
        const result= await subscriptionHistoryModel.deleteOne({_id:subscriptionHistoryId})

        if(result.deletedCount>0){
            res.json({
                message: "record deleted",
                result:result,
                statusCode:200
            })
        }
        else{
            res.json({
                message: "could not delete result with this id",
                result:result,
                statusCode:404
            })
        }
    }
    catch(err){
        res.json({
            message: "Error occurred while deleting",
            error:err.message,
            statusCode:500
        })
    }
       
}

exports.updateSubscriptionHistory = async(req,res)=>{

    try{
        const subscriptionHistoryId= req.body.subscriptionHistoryId;
    const subscription_rate_id= req.body.subscription_rate_id;
    const month_name = req.body.month_name;
    const transaction_id= req.body.transaction_id;
    const transaction_status= req.body.transaction_status;

    const result = await subscriptionHistoryModel.findOneAndUpdate({_id:subscriptionHistoryId}
        ,{
            subscription_rate_id,
            month_name,
            transaction_id,
            transaction_status,
            user_id:req.body.user_id,
            table_name:req.body.table_name
        } ,
        {
            new:true,
        }  
        )

        
        if(result){
            res.json({
                message: "record updated successfully",
                result:result,
                statusCode:200
            })
        }
        else{
            res.json({
                message: "could not update record",
                result:result,
                statusCode:404
            })
        }

    }
    catch(err){
        res.json(err)
    }
    

}
 
exports.getSubscriptionHistoryByUserId = async (req,res)=>{
    try{
        let user_id = req.query.user_id;
        user_id =new ObjectId(user_id);

        const result = await subscriptionHistoryModel.aggregate([
            {
                $match:{user_id:user_id}
            },
            {
             $lookup:{
                from:"subscription_rates",
                localField:"subscription_rate_id",
                foreignField:"_id",
                as :"subscription_rate_details"

             }
            },
            {
                $lookup:{
                   from:"doctors",
                   localField:"user_id",
                   foreignField:"_id",
                   as :"doctor_Details"
   
                }
            },
            {
                $lookup:{
                   from:"departments",
                   localField:"doctor_Details.department_id",
                   foreignField:"_id",
                   as :"doctor_departmentDetails"
   
                }
            },
            
            {
                $lookup:{
                   from:"hospitals",
                   localField:"user_id",
                   foreignField:"_id",
                   as :"hospital_Details"
                }
            },

        ])

        if(result){
            res.json({
                message: "subscription history of this user fetched",
                result:result,
                status:true,
            })
        }
        else{
            res.json({
                message: "could not fetch any details",
                status:false,
            })
        }

    }
    catch(err){
        res.json({
            message: "Error",
            error:err.message,
            status:false
        })
    }

}
