const mongoose = require('mongoose');
const { SubscribeRulesList } = require('twilio/lib/rest/video/v1/room/roomParticipant/roomParticipantSubscribeRule');
const other_patient_detailsModel = require("../models/other_patient_detailsModel");

exports.getAllOtherPatientDetails = async (req,res)=>{
    try{
        const result= await other_patient_detailsModel.find({});
        if(result){
            res.json({
                message: "All other patient details ",
                result:result,
                status:"success"

            })
        }
        else{
            res.json({
                message: "could not get other patient details",
                result:null,
                status:"failed"
            })
        }
    }
    catch(err){
        res.json({
            message: "Error occurred while getting patient details",
            error:err.message,
        })
    }
}

exports.getPatientDetailsByPatientId = async (req,res)=>{
    try{
        const other_patient_id = req.query.other_patient_id;
        const result= await other_patient_detailsModel.findOne({_id:other_patient_id});
        if(result){
            res.json({
                message: "patient details found",
                result:result,
                status:"success"

            })
        }
        else{
            res.json({
                message: "could not get other patient details",
                result:null,
                status:"failed"
            })
        }
    }
    catch(err){
        res.json({
            message: "Error occurred while getting patient details",
            error:err.message,
        })
    }
}

exports.deleteOtherPatientDetails = async (req,res)=>{
    try{
        const other_patient_id = req.query.other_patient_id;
        const result= await other_patient_detailsModel.deleteOne({_id:other_patient_id});
        if(result.deletedCount>0){
            res.json({
                message: "other patient details deleted successfully",
                result:result,
                status:"success"

            })
        }
        else{
            res.json({
                message: "could not delete other patient details",
                result:null,
                status:"failed"
            })
        }
    }
    catch(err){
        res.json({
            message: "Error occurred while deleting other patient details",
            error:err.message,
        })
    }
}

exports.updateOtherPatientDetails = async (req,res)=>{
    try{
        const other_patient_id = req.body.other_patient_id;
        const name = req.body.name;
        const gender = req.body.gender;
        const age = req.body.age;
        const relation_with_patient = req.body.relation_with_patient;

        const result= await other_patient_detailsModel.findByIdAndUpdate({_id:other_patient_id}
            ,
            {
                name:name,
                gender:gender,
                age:age,
                relation_with_patient:relation_with_patient
            },
            {
                new:true
            }
            );
        if(result){
            res.json({
                message: "Other patient details updated successfully",
                result:result,
                status:"success"

            })
        }
        else{
            res.json({
                message: "could not update other patient details",
                result:null,
                status:"failed"
            })
        }
    }
    catch(err){
        res.json({
            message: "Error occurred while updating other patient details",
            error:err.message,
        })
    }
}

