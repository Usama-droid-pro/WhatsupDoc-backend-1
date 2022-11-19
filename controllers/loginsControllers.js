
const mongoose = require("mongoose");
const loginModel = require("../models/loginsModel");
const hospitalModel= require("../models/hospitalSchema")
const adminModel = require("../models/adminModel")
const bcrypt = require("bcryptjs");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const auth= require("../middlewares/auth");
const loginsModel = require("../models/loginsModel");
const { request } = require("express");
const doctorModel = require("../models/doctorModel")
const patientModel= require("../models/patientModel")
const sendNotification= require("../utils/notification")

exports.register= async (req,res)=>{

    try{
        const { error } = registerSchema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        //Check if the user is already in the db
        const emailExists = await loginsModel.findOne({ email: req.body.email });
  
        if (emailExists) return res.status(400).json({
            message: "Email already exists",
            status:'failed'
        })
  
        //hash passwords
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);


        let savedUserProfile;

        if(req.body.table_name==="hospital"){
            savedUserProfile= new hospitalModel({
                _id:mongoose.Types.ObjectId()
            })
            savedUserProfile = await savedUserProfile.save()
                
        }
        else if(req.body.table_name==="admin"){
            savedUserProfile = new adminModel({
                _id:mongoose.Types.ObjectId()
            })
            savedUserProfile = await savedUserProfile.save()
        }
        else if(req.body.table_name==="doctor"){
            savedUserProfile = new doctorModel({
                _id:mongoose.Types.ObjectId()
            })
            savedUserProfile = await savedUserProfile.save()
        }
        else if(req.body.table_name==="patient"){
            savedUserProfile = new patientModel({
                _id:mongoose.Types.ObjectId()
            })
            savedUserProfile = await savedUserProfile.save()
        }

        const userRegister = new loginModel({
        _id:mongoose.Types.ObjectId(),
        user_id: savedUserProfile._id,
        table_name:req.body.table_name,
        user_name:req.body.user_name,
        email:req.body.email,
        online_status:req.body.online_status,
        password:hashPassword,
        })

        const registeredUser = await userRegister.save();
        let notificationSaveResponse={};
        if(registeredUser){
            const token = jwt.sign({ _id: registeredUser._id }, process.env.TOKEN);

            if(registeredUser.table_name==="hospital"){
                const isNotificationSaved= await sendNotification("" ,registeredUser._id , "New hospital signed Up." , "admin" , "hospital" )
                if(isNotificationSaved){
                    notificationSaveResponse.message="Notification has been sent to admin"
                }
            }
            if(registeredUser.table_name==="doctor"){
                const isNotificationSaved= await sendNotification("" ,registeredUser._id , "New doctor signed Up." , "admin" , "doctor" )
                if(isNotificationSaved){
                    notificationSaveResponse.message="Notification has been sent to admin"
                }
                
            }   
            
            
            

            res.json({
                message: "User has been Registered" ,
                result:registeredUser,
                statusCode:201,
                token:token,
                notificationSaveResponse:notificationSaveResponse,
            })
        }
        else{
            res.json({
                message:"User could not be registered",
                result: result,
                statusCode:400
            })
        }

    }
    catch(e){
        res.json({
            message : "Error occurred while registering User",
            error: e.message,
            statusCode:404

        })
    }
}


exports.login = async (req,res)=>{
    const { error } = loginSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
  
    const user = await loginsModel.findOne({ email: req.body.email });
  
    if (!user) return res.status(400).json({
        message: "Email or Password is incorrect",
        status:"failed"
    });
  
    const validPass = await bcrypt.compare(req.body.password, user.password);

    if (!validPass) return res.status(400).json({
        message: "Email or Password is incorrect",
        status:"failed"
    });;

    const token = jwt.sign({ _id: user.user_id}, process.env.TOKEN);

    res.json({
        message: "Logged in successfully", 
        result:user,
        token: token,
        status:"success",
        
    })


}


exports.checkLogin=(req,res)=>{
    
}


exports.getAllUsers = async (req,res)=>{

    try{
        const users = await loginModel.find({});
        if(users){
            res.json({
                message: "All users fetched successfully",
                result: users,
                status:"success",
                statusCode:200
            })
        }
        else{
            res.json({
                message: "users could not be fetched",
                result:result,
                statusCode:404
            })
        }
    }
    catch(error){
        res.json({
            message: "error occurred while fetching users" ,
            error:error.message
        })
    }
}

exports.getSpecificUser = async(req, res)=>{
    try{
        const result = await loginModel.findOne({user_id:req.params.user_id})
        if(result){
            res.json({
                message: "User has been fetched",
                result: result,
                statusCode:200
            })
        }
        else{
            res.json({
                message:"User could not be fetched",
            })
        }
    }
    catch(err){
        res.json({
            message: "error occurred while getting user",
            error:err.message,
            statusCode:500
        })
    }
}

exports.deleteUser = async(req, res)=>{
    try{
        const user_id = req.params.user_id;
        const result = await loginModel.deleteOne({user_id: user_id})
        if(result.deletedCount>0){
            res.json({
                message: "user deleted successfully",
                result:result
            })
        }
        else{
            res.json({
                message: "could not delete user , user with this id may not exist",
                result:result
            })
        }
        
     }
     catch(err){
        res.json({
            message: "Error occurred while deleting user",
            error:err.message,
            statusCode:500
        })
     }
}


exports.updateUser = async (req,res)=>{
    try{
        const user_id = req.body.user_id
        const email = req.body.email
        const onlineStatus = req.body.onlineStatus
        const status= req.body.status


        

        loginModel.findOneAndUpdate({user_id:user_id},
            {
                email:email,
                onlineStatus:onlineStatus,
                status:status
            },
            {
                new:true
            }
            ,function(err, result){
                if(result){
                    res.json({
                        message: "updated successfully",
                        result: result,
                        statusCode:200
                    })
                }
                else{
                    res.json({
                        message: "failed to update successfully",
                        result: result
                    })
                }
            }
            
            )
    }
    catch(err){
        res.json({
            message:"error occurred while updating successfully",
            Error:err.message
        })
    }
}

exports.updatePassword =async (req,res)=>{
    try{
        const email = req.body.email;

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);


        const result = await loginsModel.findOneAndUpdate({email: email} ,
            {
                password:hashPassword
            },
            {
                new:true
            }) 

            if(result){
                res.json({
                    message: "Password has been updated",
                    result:result
            })
            }
            else{
                res.json({
                    message: "Password could not be updated successfully",
                    result:resul
                })
            }
    }
    catch(err){
        res.json({
            message: "Error occurred while updating passwords",
            error:err.message
        })
    }
}


const registerSchema = Joi.object({
  table_name: Joi.string(),
  user_name: Joi.string(),
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
  online_status:Joi.boolean()
});

const loginSchema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
});
