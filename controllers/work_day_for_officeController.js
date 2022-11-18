
const mongoose = require("mongoose");
const { ExportConfigurationContext } = require("twilio/lib/rest/bulkexports/v1/exportConfiguration");
const { castObject } = require("../models/work_day_for_officeModel");
const work_day_for_officeModel= require("../models/work_day_for_officeModel")
var ObjectId = require('mongodb').ObjectId;


exports.createWorkDayForOffice = async (req,res)=>{


    try{
        const doc_id = req.body.doc_id;
        const day= req.body.day;
        const type_of_work = req.body.type_of_work;



        const foundResult = await work_day_for_officeModel.findOne({doc_id:doc_id , day: day});

        if(!foundResult){
            const newWorkDay = new work_day_for_officeModel({
                _id:mongoose.Types.ObjectId(),
                doc_id:doc_id,
                day:day,
                type_of_work:type_of_work,
            })
    
            const result = await newWorkDay.save();
            if(result){
                res.json({
                    message: "New work day has been created",
                    result: result,
                    statusCode:201
                })
            }
            else{
                res.json({
                    message: "work day could not be created",
                    result: result,
                    statusCode:404
                })
            }
        }
        else{
            res.json({
                message: "This doctor has already created the day of : "+ day,
                status:"failed"
            })
        }
        
       
    }
    catch(err){
        res.json({
            message: "Error occurred while creating work day",
            error:err.message,
        })
    }

}

exports.getAllWorkDays=async (req,res)=>{
    try{
       const result=await work_day_for_officeModel.find({}).populate("doc_id");
       if(result){
        res.json({
            message: "Result Fetched",
            result:result,
            statusCode:200
        })
       }
       else{
        res.json({
            message: "Could not find result",
            result:null,
            statusCode:404
        })
       }
       
    }
    catch(err){
        res.json({
            message: "Error Occurred",
            error:err.message,
            statusCode:500
        })
    }
}

exports.getWorkDayById=async (req,res)=>{
    try{
       const workDayId = req.params.workDayId; 
       const result=await work_day_for_officeModel.find({_id:workDayId}).populate("doc_id");
       if(result){
        res.json({
            message: "Result Fetched",
            result:result,
            statusCode:200
        })
       }
       else{
        res.json({
            message: "Could not find result",
            result:null,
            statusCode:404
        })
       }
       
    }
    catch(err){
        res.json({
            message: "Error Occurred",
            error:err.message,
            statusCode:500
        })
    }
}

exports.deleteWorkDay = async(req,res)=>{
    try{
        const workDayId = req.params.workDayId;
        const result= await work_day_for_officeModel.deleteOne({_id:workDayId})
        if(result.deletedCount>0){
            res.json({
                message: "workDay deleted successfully",
                result:result,
                statusCode:200
            })
        }
        else{
            res.json({
                message: "work day could not be deleted",
                result:result,
                statusCode:404
            })
        }
    }
    catch(err){
        res.json({
            message: "Error occurred while deleting",
            error:err.message,
            statusCode:200
        })
    }
}

exports.updateWorkDay = async (req,res)=>{
    try{
        const workDayId = req.body.workDayId;
        const doc_id = req.body.doc_id;
        const day= req.body.day;
        const type_of_work = req.body.type_of_work;

        const result = await work_day_for_officeModel.findOneAndUpdate({_id:workDayId}
            ,
            {
                doc_id:doc_id,
                day:day,
                type_of_work:type_of_work,
            },
            {
                new:true
            }
            )
            
            if(result){
                res.json({
                    message: "updated successfully",
                    result:result
                })
            }
            else{
                res.json({
                    message: "could not update successfully , work day with this id may not exist",
                    result:null,
                    


                })
            }
    }
    catch(err){
        res.json({
            message: "Error occurred while updating",
            error:err.message,
            statusCode:500
        })
    }
    
}

exports.getWorkDaysByDoctorId= async (req,res)=>{
    const doc_id = req.params.doc_id;

    try{
        const result= await work_day_for_officeModel.find({doc_id:doc_id}).populate("doc_id")
        if(result){
            res.json({
                message: "WorkDays of doctor found",
                result:result,
                statusCode:200
            })
        }
        else{
            res.json({
                message: "could not found work days",
                result:result,
                statusCode:404
            })
        }
    }
    catch(err){
        res.json({
            message: "Error occurred",
            error:err.message,
        })
    }
}


exports.getWorkDaysWithTiming=async (req,res)=>{
    try{
        let doc_id= req.query.doc_id;   
        doc_id= new ObjectId(doc_id);     
        const day = req.query.day;

        const array = [];
        
        if(doc_id){
            array.push(
                {
                    $match:{doc_id:doc_id}
                },
                {
                    $lookup:{
                        from:"work_day_for_office_timings",
                        localField:"_id",
                        foreignField:"work_id",
                        as:"day_timings"
                    }
                }
            )
        }

        if(doc_id && day){
            array.push(
                {
                    $match:{doc_id:doc_id ,day:day}
                },
                {
                    $lookup:{ 
                        from:"work_day_for_office_timings",
                        localField:"_id",
                        foreignField:"work_id",
                        as:"day_timings"
                    }
                }
            )
        }

        const result = await work_day_for_officeModel.aggregate(array)

        if(result){
            res.json({
                message: "Result fetched",
                result: result,
                statusCode:200
            })
        }
        else{
            res.json({
                message: "could not fetched",
                result: null
            })
        }



    }
    catch(err)
    {
        res.json({
            message: "error occurred while processing",
            error:err.message,
        })
    }
}

exports.getWorkDaysWithTimingAndTypeOfWork=async (req,res)=>{
    try{
        let doc_id= req.query.doc_id;   
        doc_id= new ObjectId(doc_id);     
        const day = req.query.day;
        const type_of_work = req.query.type_of_work;
        console.log(type_of_work)

        const array = [];
        
        if(doc_id && type_of_work){
            array.push(
                {
                    $match:{doc_id:doc_id , type_of_work:type_of_work}
                },
                {
                    $lookup:{
                        from:"work_day_for_office_timings",
                        localField:"_id",
                        foreignField:"work_id",
                        as:"day_timings"
                    }
                }
            )
        }

        if(doc_id && day && type_of_work){
            array.push(
                {
                    $match:{doc_id:doc_id ,day:day , type_of_work:type_of_work}
                },
                {
                    $lookup:{ 
                        from:"work_day_for_office_timings",
                        localField:"_id",
                        foreignField:"work_id",
                        as:"day_timings"
                    }
                }
            )
        }

        const result = await work_day_for_officeModel.aggregate(array)

        if(result){
            res.json({
                message: "Result fetched",
                result: result,
                statusCode:200
            })
        }
        else{
            res.json({
                message: "could not fetched",
                result: null
            })
        }



    }
    catch(err)
    {
        res.json({
            message: "error occurred while processing",
            error:err.message,
        })
    }
}