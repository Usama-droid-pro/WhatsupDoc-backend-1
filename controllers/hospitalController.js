
const mongoose = require("mongoose")
const hospitalModel = require("../models/hospitalSchema")
const cloudinary = require("../utils/cloudinary")
var ObjectId = require('mongodb').ObjectId;
const axios = require('axios')

exports.updateHospital = async (req,res)=>{
    let hospital_id= req.body.hospital_id;
    hospital_id=new ObjectId(hospital_id);

    const hospital_type_id = req.body.hospital_type_id;
    const subscription_history_id = req.body.subscription_history_id;
    const name = req.body.name;
    const city = req.body.city;
    const state = req.body.state;
    const zip_code = req.body.zip_code;
    const country = req.body.country;
    const street_address = req.body.street_address;
    const long = req.body.long;
    const lat = req.body.lat;
    const locationAddress = req.body.locationAddress;
    const hospital_owner = req.body.hospital_owner;
    const official_email = req.body.official_email;
    const official_contact = req.body.official_contact;
    const opening_time = req.body.opening_time;
    const closing_time = req.body.closing_time;
    const website_or_social_link = req.body.website_or_social_link;



    try{
        
        if(req.files){
            if(req.files.profile_img){
            console.log(req.file)
            const foundHospital= await hospitalModel.findOne({_id:hospital_id})
            if(foundHospital){
                if(foundHospital.profile_img.public_id){
                    await cloudinary.uploader.destroy(foundHospital.profile_img.public_id)
                   }
                   else{
                    console.log("did not found this user")
                   }
            
                    const c_result= await cloudinary.uploader.upload(req.files.profile_img[0].path)
                     var profile_img = {
                         imgUrl:c_result.secure_url,
                         public_id:c_result.public_id
                     }
                     
                     console.log(profile_img)
            }
            
            }
        }
        


        if(req.files){
            if(req.files.img){
                if(req.files.img.length>0){
                    console.log(req.files.img)
                const foundHospital= await hospitalModel.findOne({_id:hospital_id})
        
                if(foundHospital){
                    if(foundHospital.img.length>0){
                        let imagesArray = foundHospital.img;
                        imagesArray.forEach(element => {
                            cloudinary.uploader.destroy(element.public_id)
                        });
                     }
                    else{
                         console.log("images with this id not found")
                    }
            
                    var pathsArray = [];
                    for (const file of req.files.img){
                        const {path}= file
                        const c_result = await cloudinary.uploader.upload(path)
                         pathsArray.push({
                           img_url: c_result.secure_url,
                            public_id:c_result.public_id
                         })
                
                    }
                    console.log(pathsArray)
                }
                
                }
            }
           
        }
        
    

          if(long && lat){
            const updateHospital = await hospitalModel.findOneAndUpdate(
                {
                    _id:hospital_id
                },
                {
                    hospital_type_id:hospital_type_id,
                    subscription_history_id:subscription_history_id,
                    name,
                    city,
                    state,
                    zip_code,
                    country,
                    street_address,
                    $set:{
                            "location.coordinates": [long , lat]
                        }
                    ,
                    locationAddress:locationAddress,
                    hospital_owner,
                    official_email,
                    official_contact,
                    opening_time,
                    closing_time,
                    website_or_social_link,
                    profile_img:profile_img,
                    img:pathsArray
    
                },
                {
                    new:true,
                    upsert:true
                }
             )
    
             if(updateHospital){
                res.json(updateHospital)
             }
             else{
                res.json("could not update ")
             }
          }
          else{
            const updateHospital = await hospitalModel.findOneAndUpdate(
                {
                    _id:hospital_id
                },
                {
                    hospital_type_id:hospital_type_id,
                    subscription_history_id:subscription_history_id,
                    name,
                    city,
                    state,
                    zip_code,
                    country,
                    street_address,
                    locationAddress:locationAddress,
                    hospital_owner,
                    official_email,
                    official_contact,
                    opening_time,
                    closing_time,
                    website_or_social_link,
                    profile_img:profile_img,
                    img:pathsArray
    
                },
                {
                    new:true,
                    upsert:true
                }
             )
    
             if(updateHospital){
                res.json(updateHospital)
             }
             else{
                res.json("could not update ")
             }
          }
          
 
     }
    
    catch(err){
        console.log(err)
        res.json({
            message: "Error occurred while updating",
            error:err.message
        })
    }
    
   

    // if(req.file){

    // }

}


exports.getAllHospitals=async (req,res)=>{
    
    try{
        const result =await hospitalModel.find({}).populate("hospital_type_id")
        if(result){
        res.json({
            message: "Fetched all hospital Profiles",
            result:result,
            statusCode:200
        })
         }
         else{
        res.json({
            message: "could not fetch hospital profiles"
        })
        }
        }
        catch(err){
        res.json({
            message: "Error occurred while fetching hospitals",
            error:err.message
        })
    }
    
}

exports.getHospitalById = async(req,res)=>{
    const hospital_id= req.params.hospital_id;

    try{
        const result =await hospitalModel.find({_id:hospital_id}).populate("hospital_type_id")
        if(result){
        res.json({
            message: "Fetched hospital with this id",
            result:result,
            statusCode:200
        })
         }
         else{
        res.json({
            message: "could not fetch hospital with this id , Record with this id may not exist"
        })
        }
        }
        catch(err){
        res.json({
            message: "Error occurred while fetching hospital",
            error:err.message
        })
        
    }
}

exports.deleteHospitalProfile = async (req,res)=>{
    const hospital_id= req.params.hospital_id;

    try{
        const findHospital = await hospitalModel.findOne({_id:hospital_id});
        console.log(findHospital)

        if(findHospital){
            if(findHospital.profile_img ){
                await cloudinary.uploader.destroy(findHospital.profile_img.public_id)
            }
        }

        if(findHospital){
            if(findHospital.img.length>0){
                let imagesArray = findHospital.img;
                imagesArray.forEach(element => {
                    cloudinary.uploader.destroy(element.public_id)
                });
            }
        }
        

        const result= await hospitalModel.deleteOne({_id:hospital_id});
        if(result.deletedCount>0){
            res.json({
                message: "Hospital has been deleted successfully",
                result:result,
                statusCode:200
            })
        }
        else{
            res.json({
                message: "could not delete hospital , hospital with this id may not exists"
            })
        }
        

    }
        catch(err){
        res.json({
            message: "Error occurred while deleting hospital",
            error:err.message,
        })
    }
}

