
const mongoose = require("mongoose");
const hospitalTypeModel= require("../models/hospitalTypeModel")

exports.createHospitalType= async (req,res)=>{
    const name = req.body.name;
    
    try{
        const newHospitalType =new hospitalTypeModel({
            _id:mongoose.Types.ObjectId(),
            name:name,
        })

        const result= await newHospitalType.save();

        if(result){
            res.json({
                message:"Successfully created hospitalType",
                result:result,
                statusCode:201,
            })
        }else{
            res.json({
                message:"Could not create hospitalType", 
                statusCode:500,
                result:result
            })
        }
    }
    catch(err){
        res.json({
            message: "error occurred while creating hospitalType",
            error:err.message,
        })
    }
}

exports.getAllHospitalTypes = async (req,res)=>{
    try{
        const result = await hospitalTypeModel.find({});

        if(result){
            res.json({
                message:"Successfully fetched hospital types",
                result:result,
                statusCode:200
            })
        }
        else{
            res.json({
                message: "Could not fetched all hospital types",
                result:result,
                statusCode:200
            })
        }
    }
    catch(err){
        res.json({
            message:"error occurred while fetching hospital types",
            error:err
        })
    }
}
exports.getHospitalTypeById = async (req,res)=>{
    try{
        const hospitalTypeId= req.params.hospitalTypeId;
        const result = await hospitalTypeModel.findOne({_id:hospitalTypeId});

        if(result){
            res.json({
                message:"Successfully fetched hospital type",
                result:result,
                statusCode:200
            })
        }
        else{
            res.json({
                message: "Could not fetched hospital type with this id",
                result:result,
                statusCode:200
            })
        }
    }
    catch(err){
        res.json({
            message:"error occurred while fetching hospital type",
            error:err
        })
    }
}


exports.updateHospitalType= async (req,res)=>{
    try{
        const hospitalTypeId= req.body.hospitalTypeId;
        const result = await hospitalTypeModel.findOneAndUpdate({_id:hospitalTypeId}
            ,
            {
                name:req.body.name
            },
            {
                new:true
            }
            );

        if(result){
            res.json({
                message:"Successfully update hospital type",
                result:result,
                statusCode:200
            })
        }
        else{
            res.json({
                message: "Could not fetched hospital type with this id",
                result:result,
                statusCode:200
            })
        }
    }
    catch(err){
        res.json({
            message:"error occurred while fetching hospital type",
            error:err
        })
    }
}

exports.deleteHospitalType= async (req,res)=>{
    try{
        const hospitalTypeId= req.params.hospitalTypeId;
        const result = await hospitalTypeModel.deleteOne({_id:hospitalTypeId});

        if(result.deletedCount >0){
            res.json({
                message:"Successfully deleted hospital type",
                result:result,
                statusCode:200
            })
        }
        else{
            res.json({
                message: "Could not delete hospital type with this id",
                result:result,
                statusCode:200
            })
        }
    }
    catch(err){
        res.json({
            message:"error occurred while deleting hospital type",
            error:err
        })
    }
}