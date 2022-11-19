
const mongoose = require("mongoose")
const work_day_for_office_timingModel= require("../models/work_day_for_office_timingModel")
const moment = require('moment');

exports.createWorkDayForOfficeTiming = async (req,res)=>{

    try{
        const work_id=req.body.work_id;
        let start_time=req.body.start_time;
        let end_time=req.body.end_time;
        const start_time_state = req.body.start_time_state;
        const end_time_state = req.body.end_time_state;
        console.log(end_time);


      
        let moment_start_time = moment(start_time,'hh:mm:ss a')
        let moment_end_time = moment(end_time , 'hh:mm:ss a')
        console.log(moment_start_time)
        var bool=false;

        const foundResult = await work_day_for_office_timingModel.find({work_id:work_id});

        for (let element of foundResult) {
            let start= moment(element.start_time, 'hh:mm:ss a')
            let end= moment(element.end_time, 'hh:mm:ss a')

            if((moment_start_time.isBetween(start , end) || moment_end_time.isBetween(start,end) || moment_start_time.isSame(start)) || moment_end_time.isSame(end) ||(moment_start_time.isBefore(start) && moment_end_time.isAfter(end))){
                bool=true;
                break; 
                
            }
            else{
                console.log("not in between")
            }
        };
        


       

        if(bool===false){
            const newWorkDayOfficeTiming = new work_day_for_office_timingModel({
                _id:mongoose.Types.ObjectId(),
                work_id:work_id,
                start_time:start_time,
                end_time:end_time,
                start_time_state:start_time_state,
                end_time_state:end_time_state
            })
    
    
    
            const result = await newWorkDayOfficeTiming.save();
            if(result){
                res.json({
                    message: "New work day for office timing has been created",
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
                message: "Time slot conflict . Please ensure that time range you selected is not in between of some other slot Or some other slot is not in between your selected range , ",
                status:"failed",

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

exports.getAllWorkDaysForOfficeTiming = async (req,res)=>{
    try{
        const result=await work_day_for_office_timingModel.find({}).populate({path : 'work_id',
        populate : {
          path : 'doc_id'
        }});
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

exports.getWorkDayForOfficeTimingById = async (req,res)=>{

    try{
        const workDayOfficeTimingId = req.params.workDayOfficeTimingId;        
        const result=await work_day_for_office_timingModel.find({_id:workDayOfficeTimingId}).populate({path : 'work_id',
        populate : {
          path : 'doc_id'
        }})
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

exports.updateWorkDayForOfficeTiming = async (req,res)=>{
    
    try{
        const workDayOfficeTimingId = req.body.workDayOfficeTimingId;
        const work_id=req.body.work_id;
        const start_time=req.body.start_time;
        const end_time=req.body.end_time;
        const start_time_state = req.body.start_time_state;
        const end_time_state = req.body.end_time_state



        const result = await work_day_for_office_timingModel.findOneAndUpdate({_id:workDayOfficeTimingId}
            ,
            {
            work_id:work_id,
            start_time:start_time,
            end_time:end_time,
            start_time_state:start_time_state,
            end_time_state:end_time_state,
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
                    message: "could not update successfully , work day office timing with this id may not exist",
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

exports.deleteWorkDayForOfficeTiming = async(req,res)=>{
    try{
        const workDayOfficeTimingId = req.params.workDayOfficeTimingId;
        const result= await work_day_for_office_timingModel.deleteOne({_id:workDayOfficeTimingId})
        if(result.deletedCount>0){
            res.json({
                message: "workDayFor Office timing deleted successfully",
                result:result,
                statusCode:200
            })
        }
        else{
            res.json({
                message: "work day for office timing could not be deleted",
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

exports.getWorkDayForOfficeTimingByWork_id= async(req,res)=>{
    const work_id = req.params.work_id;

    try{
        const result= await work_day_for_office_timingModel.find({work_id:work_id}).populate({path : 'work_id',
        populate : {
          path : 'doc_id'
        }})
        if(result){
            res.json({
                message: "WorkDays office timing related to this work_id found",
                result:result,
                statusCode:200
            })
        }
        else{
            res.json({
                message: "could not found work days office timing",
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