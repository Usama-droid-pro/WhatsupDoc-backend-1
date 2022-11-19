const mongoose = require('mongoose');
const { RecordingSettingsContext } = require('twilio/lib/rest/video/v1/recordingSettings');
const subscriptionRateModel = require("../models/subscriptionRateModel")

exports.createSubscription =async (req,res)=>{
    try{
        const name= req.body.name;
        const pkg_for= req.body.pkg_for;
        const rate= req.body.rate;

        const newSubscriptionRate = new subscriptionRateModel({
            _id:mongoose.Types.ObjectId(),
            name:name,
            pkg_for:pkg_for,
            rate:rate
        })
        const savedSubscriptionRate = await newSubscriptionRate.save();
        
        if(savedSubscriptionRate){
            res.json({
                message: "new subscription has been made successfully",
                result : savedSubscriptionRate,
                statusCode:200
            })
        }
        else{
            res.json({
                message: "could not save subscription",
                result : result,
                statusCode:500
            })
        }
        
    }

    catch(err){
        res.json({
            message: "Error occurred while creating subscription",
            error:err.message,
        })
    }
}

exports.getAllSubscriptions = async (req,res)=>{

    try{
        const result = await subscriptionRateModel.find({});
    if(result){
        res.json({
            message: "all subscription fetched",
            result : result,
            statusCode:200
        })
    }
    else{
        res.json({
            message: "could not fetched subscriptions",
            statusCode:200
        })
    }
    }
    catch(err){
        res.json({
            message: "Error occurred while fetching subscriptions",
            error:err.message
        })
    }
    
}

exports.getSubscriptionById = async (req,res)=>{

    try{
        const subscriptionRateId = req.params.subscriptionRateId;
        const result = await subscriptionRateModel.findOne({_id:subscriptionRateId});
    if(result){
        res.json({
            message: "subscription with this id fetched",
            result : result,
            statusCode:200
        })
    }
    else{
        res.json({
            message: "could not fetched subscription , with this id ,it may not exist",
            statusCode:200
        })
    }
    }
    catch(err){
        res.json({
            message: "Error occurred while fetching subscription",
            error:err.message
        })
    }
    
}

exports.deleteSubscriptionRate = async (req,res)=>{

    try{
        const subscriptionRateId = req.params.subscriptionRateId;
        const result = await subscriptionRateModel.deleteOne({_id:subscriptionRateId});
    if(result.deletedCount>0){
        res.json({
            message: "subscription deleted successfully",
            result : result,
            statusCode:200
        })
    }
    else{
        res.json({
            message: "could not deleted , with this id ,it may not exist",
            statusCode:200
        })
    }
    }
    catch(err){
        res.json({
            message: "Error occurred while deleting subscription",
            error:err.message
        })
    }
    
}

exports.updateSubscriptionRate = async (req,res)=>{

    try{
        const subscriptionRateId = req.body.subscriptionRateId;
        const name= req.body.name;
        const pkg_for= req.body.pkg_for;
        const rate= req.body.rate;

        const result = await subscriptionRateModel.findOneAndUpdate({_id:subscriptionRateId} ,
             {
                name:name,
                pkg_for:pkg_for,
                rate:rate
            },
            {
                new:true
            }
        );

    if(result){
        res.json({
            message: "subscription updated successfully",
            result : result,
            statusCode:200
        })
    }
    else{
        res.json({
            message: "could not updated , with this id ,it may not exist",
            statusCode:200
        })
    }
    }
    catch(err){
        res.json({
            message: "Error occurred while updating subscription",
            error:err.message
        })
    }
    
}