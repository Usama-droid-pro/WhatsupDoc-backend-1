
const mongoose = require("mongoose")
const appointment_historyModel = require("../models/appointment_historyModel")

exports.createAppointmentHistory= async(req,res)=>{
    try{
        const appointment_id = req.body.appointment_id;
        const transaction_id = req.body.transaction_id;
        const table_name_to= req.body.table_name_to;
        const table_name_from= req.body.table_name_from;
        const transaction_status = req.body.transaction_status;

        const appointment_history = new appointment_historyModel({
            _id:mongoose.Types.ObjectId(),
            appointment_id:appointment_id,
            transaction_id:transaction_id,
            table_name_to:table_name_to,
            table_name_from:table_name_from,
            transaction_status:transaction_status

        })
        const result = await appointment_history.save();

        if(result){
            res.json({
                message: "Appointment history saved successfully",
                result:result,
                statusCode:200
            })
        }
        else{
            res.json({
                message: "Could not save appointment history",
                result:result,
                statusCode:404
            })
        }
    }
    catch(err){
        res.json({
            message: "Error",
            error:err.message
        })
    }
}

exports.getAllAppointmentHistories= async(req,res)=>{
    try{
        const result= await appointment_historyModel.find({}).populate("appointment_id");
        if(result){
            res.json({
                message : "Fetched all appointment histories",
                result:result,
                statusCode:200
            })
        }else{
            res.json({
                message: "Could not fetched all appointment histories",
                result:null,
                statusCode:404
            })
        }
    }
    catch(err){
        res.json({
            message: "Error",
            error:err.message
        })
    }
}

exports.getAppointmentHistoryByAppointmentId= async(req,res)=>{
    try{
        const appointment_id = req.params.appointment_id;
        const result= await appointment_historyModel.find({appointment_id:appointment_id}).populate("appointment_id");
        if(result){
            res.json({
                message : "Fetched appointment history by this appointment id.",
                result:result,
                statusCode:200
            })
        }else{
            res.json({
                message: "Could not fetched history",
                result:null,
                statusCode:404
            })
        }
    }
    catch(err){
        res.json({
            message: "Error",
            error:err.message
        })
    }
}

exports.getAppointmentHistoryByAppointmentHistoryId= async(req,res)=>{
    try{
        const appointment_history_id = req.params.appointment_history_id;
        const result= await appointment_historyModel.find({_id:appointment_history_id}).populate("appointment_id");
        if(result){
            res.json({
                message : "Fetched appointment history by this appointment history id.",
                result:result,
                statusCode:200
            })
        }else{
            res.json({
                message: "Could not fetched appointment history",
                result:null,
                statusCode:404
            })
        }
    }
    catch(err){
        res.json({
            message: "Error",
            error:err.message
        })
    }
}

exports.getAppointmentHistoryByAppointmentHistoryId= async(req,res)=>{
    try{
        const appointment_history_id = req.params.appointment_history_id;
        const result= await appointment_historyModel.find({_id:appointment_history_id}).populate("appointment_id");
        if(result){
            res.json({
                message : "Fetched appointment history by this appointment history id.",
                result:result,
                statusCode:200
            })
        }else{
            res.json({
                message: "Could not fetched appointment history",
                result:null,
                statusCode:404
            })
        }
    }
    catch(err){
        res.json({
            message: "Error",
            error:err.message
        })
    }
}

exports.deleteAppointmentHistory = async (req ,res)=>{
    try{
        const appointment_history_id =req.params.appointment_history_id;
        const result= await appointment_historyModel.deleteOne({_id:appointment_history_id});
        if(result.deletedCount>0){
            res.json({
                message: "appointment history was successfully deleted",
                result:result,
                statusCode:200
            })
        }
        else{
            res.json({
                message: "could not delete appointment history",
                result:result
            })
        }
    }
    catch(err){
        res.json(err);
    }
}

exports.updateAppointmentHistory = async (req,res)=>{
    try{
        const appointment_history_id= req.body.appointment_history_id;
        const appointment_id = req.body.appointment_id;
        const transaction_id = req.body.transaction_id;
        const table_name_to= req.body.table_name_to;
        const table_name_from= req.body.table_name_from;
        const transaction_status = req.body.transaction_status;

        const result = await appointment_historyModel.findOneAndUpdate({_id:appointment_history_id} , 
            {
                appointment_id:appointment_id,
                transaction_id:transaction_id,
                table_name_to:table_name_to,
                table_name_from:table_name_from,
                transaction_status:transaction_status
            },
            {
                new:true
            }
            );

            if(result){
                res.json({
                    message: "updated successfully",
                    result:result,
                    statusCode:200
                })

            }
            else{
                res.json({
                    message: "could not be updated successfully",
                    result:null
                })
            }
        
    }
    catch(err){
        console.log(err)
        res.json({
            message: "error occurred",
            error:err.message
        })
    }
}