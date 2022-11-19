
const mongoose = require('mongoose');
const patientModel= require("../models/patientModel")
const cloudinary= require("../utils/cloudinary")


exports.createPatient= async (req,res)=>{
    try{
        const patient_id =req.body.patient_id;
        const name= req.body.name;
        const city=req.body.city;
        const state = req.body.state;
        const gender = req.body.gender;
        const zip_code = req.body.zip_code;
        const country = req.body.country;
        const phone_no = req.body.phone_no;
        const street_address=req.body.street_address;
        const long = req.body.long;
        const lat = req.body.lat;
        const locationAddress=req.body.locationAddress;
        const health_condition=req.body.health_condition;
        const major_disease = req.body.major_disease;
        const social_security_no = req.body.social_security_no;
        const profession_status = req.body.profession_status;
        const age = req.body.age;

        var foundResult= await patientModel.findOne({_id:patient_id})
        if(req.files){
//-----------------------------------------------------------------------------------------
            if(req.files.img){

                if(foundResult){
                    console.log(foundResult)
                    if(foundResult.img){
                        console.log(foundResult.img)
                        if(foundResult.img.public_id){
                            console.log(foundResult.img.public_id)
                            await cloudinary.uploader.destroy(foundResult.img.public_id)
                        }else{
                            console.log("could not found public_id")
                        }
                    }else{
                        console.log("could not found profile image")
                    }
                }
                else{
                    console.log("could not find patient with this id")
                }

                const c_result= await cloudinary.uploader.upload(req.files.img[0].path)
                var profile_img = {
                     imgUrl:c_result.secure_url,
                     public_id:c_result.public_id
                     }
                    console.log(profile_img)
            }

 //-----------------------------------------------------------------------------------------
        }
        

        if(long && lat){
            var result = await patientModel.findOneAndUpdate({_id:patient_id} , 
            
                {
                    name:name,
                    img:profile_img,
                    phone_no:phone_no,
                    gender:gender,
                    city:city,
                    state:state,
                    zip_code:zip_code,
                    country:country,
                    street_address:street_address,
                    locationAddress:locationAddress,
                    $set:{
                        "location.coordinates":[long,lat]
                    },
                    health_condition:health_condition,
                    major_disease:major_disease,
                    social_security_no:social_security_no,
                    profession_status:profession_status,
                    age:age
    
                }
                ,
                {
                    new:true,
                    upsert:true
                })
        }
        else{
            var result = await patientModel.findOneAndUpdate({_id:patient_id} , 
            
                {
                    name:name,
                    img:profile_img,
                    phone_no:phone_no,
                    gender:gender,
                    city:city,
                    state:state,
                    zip_code:zip_code,
                    country:country,
                    street_address:street_address,
                    locationAddress:locationAddress,
                    health_condition:health_condition,
                    major_disease:major_disease,
                    social_security_no:social_security_no,
                    profession_status:profession_status,
                    age:age
    
                }
                ,
                {
                    new:true,
                    upsert:true
                })
        }
        

        if(result){
            res.json({
                message: "patient has been saved successfully",
                result:result,
                statusCode: 201
            })
        }
        else{
            res.json({
                message: "could not save patient",
                statusCode:404
            })
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


exports.getAllPatients = async(req,res)=>{
    
    try{
        const result = await patientModel.find({})

        if(result){
            res.json({
                message: "All patients fetched successfully",
                result:result,
                statusCode: 200
            })
        }else{
            res.json({
                message: "Could not fetch patients profiles",
                result:result,
                statusCode:404
            })
        }
    }
    catch(err){
        res.json({
            message: "Error occurred while fetching",
            error:err.message,
        })
    }
}

exports.getPatientById = async(req,res)=>{
    
    try{
        const patient_id = req.params.patient_id;
        const result = await patientModel.find({_id:patient_id});
        if(result){
            res.json({
                message: "patient fetched successfully",
                result:result,
                statusCode: 200
            })
        }else{
            res.json({
                message: "Could not fetch patient profile with this id ",
                result:result,
                statusCode:404
            })
        }
    }
    catch(err){
        res.json({
            message: "Error occurred while fetching",
            error:err.message,
        })
    }
}

exports.deletePatientProfile = async function(req,res){

    try{
        const patient_id = req.params.patient_id;
        const foundResult= await patientModel.findOne({_id:patient_id})

//------------------------------------------------------------------------------------------------------------------
    if(foundResult){
        console.log(foundResult)
        if(foundResult.img){
            console.log(foundResult.img)
            if(foundResult.img.public_id){
                console.log(foundResult.img.public_id)
                await cloudinary.uploader.destroy(foundResult.img.public_id)
            }else{
                console.log("could not found public_id")
            }
        }else{
            console.log("could not found profile image")
        }
    }
    else{
        console.log("could not find patient with this id")
    }

//------------------------------------------------------------------------------------------------------------------



const result = await patientModel.deleteOne({_id:patient_id})

if(result.deletedCount>0){
    res.json({
        message: "patient deleted successfully",
        result:result,
        statusCode:200
    })
}
else{
    res.json({
        message: "No any patient deleted , patient with this id may not exist",
        statusCode:404,
        result:result,
    })
}
    }
    catch(err){
        res.json({
            message: "error occurred while deleting",
            error:err.message,
            statusCode:500
        })
    }

}