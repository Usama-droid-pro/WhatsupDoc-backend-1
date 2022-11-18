const mongoose = require('mongoose');
const departmentModel = require("../models/departmentsModel")
const hospitalModel = require("../models/hospitalSchema");
const doctorModel = require("../models/doctorModel");



exports.Search = async (req,res)=>{
    try{
        
        let text = req.query.text;
        const type=req.query.type;

        if(type==="hospital"){
            const result = await hospitalModel.aggregate([
                {
                    $lookup:{
                        from:"departments",
                        localField:"_id",
                        foreignField:"hospital_id",
                        as:"Hospital_departments"
                    }
                },
                {
                    $match:{
                        $or: [
                            {city:{$regex:text , $options: 'i',}},
                            {name:{$regex:text , $options: 'i'}},
                            {locationAddress:{$regex:text , $options: 'i'}},
                            {"Hospital_departments": {
                                "$elemMatch": {
                                    "name": {$regex:text , $options: 'i'}
                                }
                              }}

                          ]
                    }
                },
                {
                    $lookup:{
                        from:"hospital_types",
                        localField:"hospital_type_id",
                        foreignField:"_id",
                        as : "hospital_type_details"
                    }
                }
                ,
                {
                    $lookup:{
                        from:"subscriptionhistories",
                        localField:"subscription_history_id",
                        foreignField:"_id",
                        as : "subscription_history_details"
                    }
                }
            ])
            if(result){
                res.json({
                    message: "hospitals found:",
                    result:result,
                    statusCode:200
                })
            }
            else{
                res.json({
                    message:"Hospitals Did not found",
                    result:null,
                })
            }

        }
        else if (type==="doctor"){
            const result = await doctorModel.find(
                {full_name:{$regex:text}, $options:"i"}
                ).populate("hospital_id").populate("subscription_history_id")
            if(result){
                res.json({
                    message: "doctor found:",
                    result:result,
                    statusCode:200
                })
            }
            else{
                res.json({
                    message:"doctors have  not found",
                    result:null,
                })
            }
        }
        else if(type==="department"){
            const result = await departmentModel.find(
                {name:{$regex:text}, $options:"i"}
                ).populate("hospital_id")
            if(result){
                res.json({
                    message: "departments found:",
                    result:result,
                    statusCode:200
                })
            }
            else{
                res.json({
                    message:"departments have not found",
                    result:null,
                })
            }
        }
    }
    catch(err){
        console.log(err)
        res.json({
            message: "error occurred ",
            error:err.message
        })
    }


}