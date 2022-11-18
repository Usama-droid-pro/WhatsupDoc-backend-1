
const mongoose = require("mongoose");
const { ExportList } = require("twilio/lib/rest/bulkexports/v1/export");
const departmentModel = require("../models/departmentsModel")
const cloudinary = require("../utils/cloudinary")


exports.createDepartment= async(req,res)=>{

    try{
        const name = req.body.name;
        const opening_time=req.body.opening_time;
        const closing_time= req.body.closing_time;
        const hospital_id = req.body.hospital_id;
        const description = req.body.description;

        if(req.files.profile_img){
            const c_result= await cloudinary.uploader.upload(req.files.profile_img[0].path)
            var profile_img = {
                 imgUrl:c_result.secure_url,
                 public_id:c_result.public_id
                 }
                 
                console.log(profile_img)
        }

        if(req.files.images){
            if(req.files.images.length > 0){
                console.log(req.files.images)
            
                    var pathsArray = [];
                    for (const file of req.files.images){
                        const {path}= file
                        const c_result = await cloudinary.uploader.upload(path)
                         pathsArray.push({
                            imgUrl: c_result.secure_url,
                            public_id:c_result.public_id
                         })
                
                    }
                    console.log(pathsArray)
                }
        }
        


            const newDepartment = new departmentModel({
                _id:mongoose.Types.ObjectId(),
                name,
                opening_time:opening_time,
                closing_time:closing_time,
                profile_img:profile_img,
                images:pathsArray,
                hospital_id:hospital_id,
                description:description

            })

            const result= await newDepartment.save();

            if(result){
                res.json({
                    message: "department created successfully",
                    result:result,
                    statusCode:200

                })
            }
            else{
                res.json({
                    message: "department could not be created",
                    status:"failed"
                })
            }
        }

        catch(err){
            res.json({
                message:"error occurred",
                error:err.message,
            })
        }
    }

    exports.getAllDepartments = async (req,res)=>{

        try{
            const result=await departmentModel.find({}).populate("hospital_id")

            if(result){
                res.json({
                    message: "All departments have been fetched successfully",
                    result: result,
                    statusCode:200
                })
            }
            else{
                res.json({
                    message:"could not fetch  departments"
                    
                })
            }
        }
        catch(err){
            res.json(err);
        }
    }

    exports.getDepartmentById = async (req,res)=>{

        try{
            const departmentId= req.params.departmentId;
            const result=await departmentModel.findOne({_id:departmentId}).populate("hospital_id")

            if(result){
                res.json({
                    message: "department with this id is fetched",
                    result: result,
                    statusCode:200
                })
            }
            else{
                res.json({
                    message:"could not fetch  department with this id "
                })
            }
        }
        catch(err){
            res.json(err);
        }
    }

exports.deleteDepartment = async (req,res)=>{
    try{
        const department_id = req.params.department_id;

    const foundResult= await departmentModel.findOne({_id: department_id});
    if(foundResult){
        console.log(foundResult)
        if(foundResult.profile_img){
            console.log(foundResult.profile_img)
            if(foundResult.profile_img.public_id){
                console.log(foundResult.profile_img.public_id)
                await cloudinary.uploader.destroy(foundResult.profile_img.public_id)
            }else{
                console.log("could not found public_id")
            }
        }else{
            console.log("could not found profile image")
        }
    }
    else{
        console.log("could not find department with this id")
    }

    if(foundResult){
        if(foundResult.images){
            if(foundResult.images.length>0){
                foundResult.images.forEach(element =>{
                    cloudinary.uploader.destroy(element.public_id)
                })
            }
        }
        else{
            console.log("images not found for this department")
        }
    }
    else{
        console.log("could not found department")
    }


    const result= await departmentModel.deleteOne({_id:department_id});
    if(result.deletedCount>0){
        res.json({
            message: "Department deleted successfully",
            result:result,
            statusCode:200
        })
    }
    else{
        res.json({
            message: "No any department deleted , department with this id may not exist",
            statusCode:404,
            result:result,
        })
    }
    }
    catch(err){
        res.json({
            message: "Error while deleting department",
            Error:err.message,
            statusCode:500
        })
    }
    
    
}

exports.updateDepartment = async(req,res)=>{
    
    try{
        const department_id = req.body.department_id;
         const name = req.body.name;
        const opening_time=req.body.opening_time;
        const closing_time= req.body.closing_time;
        const hospital_id = req.body.hospital_id;
        const description = req.body.description;


        var foundResult= await departmentModel.findOne({_id:department_id});
        if(req.files){
            if(req.files.profile_img){
                //first finding and deleting previous profile image, in case if profile image is updating
                if(foundResult){
                    console.log(foundResult)
                    if(foundResult.profile_img){
                        console.log(foundResult.profile_img)
                        if(foundResult.profile_img.public_id){
                            console.log(foundResult.profile_img.public_id)
                            await cloudinary.uploader.destroy(foundResult.profile_img.public_id)
                        }else{
                            console.log("could not found public_id")
                        }
                    }else{
                        console.log("could not found profile image")
                    }
                }
                else{
                    console.log("could not find department with this id")
                }
                 

                // uploading new images in to cloudinary and its path will be saved in db
                const c_result= await cloudinary.uploader.upload(req.files.profile_img[0].path)
                var profile_img = {
                     imgUrl:c_result.secure_url,
                     public_id:c_result.public_id
                     }
                     
                    console.log(profile_img)
            }
        }
        

        if(req.files){
            if(req.files.images){
                if(foundResult){
                    if(foundResult.images){
                        if(foundResult.images.length>0){
                            foundResult.images.forEach(element =>{
                                cloudinary.uploader.destroy(element.public_id)
                            })
                        }
                    }
                    else{
                        console.log("images not found for this department")
                    }
                }
                else{
                    console.log("could not found department")
                }

                if(req.files.images.length > 0){
                    console.log(req.files.images)
                
                        var pathsArray = [];
                        for (const file of req.files.images){
                            const {path}= file
                            const c_result = await cloudinary.uploader.upload(path)
                             pathsArray.push({
                                imgUrl: c_result.secure_url,
                                public_id:c_result.public_id
                             })
                    
                        }
                        console.log(pathsArray)
                    }
            }
        }


        const result = await departmentModel.findOneAndUpdate({_id:department_id}
            ,
            {
                name,
                opening_time:opening_time,
                closing_time:closing_time,
                profile_img:profile_img,
                images:pathsArray,
                hospital_id:hospital_id,
                description:description
            }
            ,{
                new:true
             }
            )

            if(result){
                res.json({
                    message: "Department updated successfully",
                    result:result,
                    statusCode:200
                })
            }
            else{
                res.json({
                    message: "Department could not be updated , department with this id may not exist",
                    result:result,
                    statusCode:404
                })
            }
       
    }
    catch(err){
        res.json({
            message: "Error occurred while updating department",
            error:err.message,
            statusCode:500
        })
    }
    
}

exports.getDepartmentByHospitalId= async(req,res)=>{
    try{
        const hospital_id= req.params.hospital_id;

        const result=await departmentModel.find({hospital_id:hospital_id});
        if(result){
            res.json({
                message: "result fetched",
                result:result,
                statusCode:200
            })
        }
        else{
            res.json({
                message: "result could not be fetched",
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