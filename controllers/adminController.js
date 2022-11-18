const adminModel = require("../models/adminModel");
const cloudinary = require("../utils/cloudinary")
var ObjectId = require('mongodb').ObjectId;
exports.updateAdminProfile = async (req,res)=>{

    try{
        const user_id=req.body.user_id; 
        if(req.file){
            const foundUser = await adminModel.findOne({_id:user_id})
            console.log(foundUser)
            if(foundUser.img.public_id){
                await cloudinary.uploader.destroy(foundUser.img.public_id)
            }
            else{
                console.log("did not find user")
            }


            const c_result = await cloudinary.uploader.upload(req.file.path)
            console.log(c_result)
            let adminPic={}
            if(c_result){
                    adminPic = {
                    imageUrl:c_result.secure_url,
                    public_id:c_result.public_id
                }
            }

            console.log(adminPic)
            
            adminModel.findOneAndUpdate({_id:user_id}, 
                {
                    img:adminPic
                } , 
                {
                    new:true,
                },
                function(err,result){
                    if(result){
                        res.json({
                            _message: "Admin profile has been updated successfully",
                            result: result,
                            statusCode: 200
                        })
                    }
                    else{
                        res.json({
                            message:"could not updated "
                        })
                    }
                }
                
                )


         
        }



    }
    catch(err){
        res.json({
            message: "Error occurred while updating",
            error:err.message
        })
    }
    
}

exports.getAdminProfile = async (req,res)=>{
    try{
        let admin_id = req.body.admin_id;
        admin_id= new ObjectId(admin_id);
        
        const result=await adminModel.aggregate([
            {
                $match:{
                    _id:admin_id
                }
            },
            {
                $lookup:{
                    from: "logins",
                    localField:"_id",
                    foreignField:"user_id",
                    as : "admin_details"

                }
            }
        ])

        if(result){
            res.json({
                message: "admin found successfully",
                result : result,
                statusCode:200
            })
        }
        else{
            res.json({
                message: "Could not find admin , admin with id may not exist"
            })
        }
    }
    catch(err){
        res.json({
            message: "Error occurred while getting admin profile",
            error:err.message
        })
    }
    
}

exports.getAllAdminProfile = async (req,res)=>{
    try{
        const result=await adminModel.aggregate([
            {
                $lookup:{
                    from: "logins",
                    localField:"_id",
                    foreignField:"user_id",
                    as : "admin_details"

                }
            }
        ])

        if(result){
            res.json({
                message: "admins found successfully",
                result : result,
                statusCode:200
            })
        }
        else{
            res.json({
                message: "Could not find admins "
            })
        }
    }
    catch(err){
        res.json({
            message: "Error occurred while getting all admins",
            error:err.message
        })
    }
}

exports.deleteAdminProfile = async (req,res)=>{
    try{
        const admin_id = req.params.admin_id

        const findAdmin = await adminModel.findOne({_id: admin_id});
        if(findAdmin){
            if(findAdmin.img.public_id){
                cloudinary.uploader.destroy(findAdmin.img.public_id)
            }
            else{
                console.log("admin with this id not found")
            }
        }
        

       const result = await adminModel.deleteOne({_id:admin_id})
       if(result.deletedCount>0){
        res.json({
            message: "Successfully deleted",
            result:result
        })
       }
       else{
        res.json({
            message: "could not delete admin profile , admin with this id may not exist",
            statusCode:404
        })
       }

    }
    catch(err){
        res.json({
            message: "error occurred while deleting admin profile",
            error:err.message
        })
    }
}