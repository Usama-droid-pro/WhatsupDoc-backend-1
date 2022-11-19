
const mongoose = require('mongoose');
const doctorModel= require("../models/doctorModel")
const cloudinary= require("../utils/cloudinary")

const sendNotification= require("../utils/notification")

exports.createDoctor= async (req,res)=>{
    try{
        const doctor_id =req.body.doctor_id;
        const hospital_id= req.body.hospital_id;
        const subscription_history_id= req.body.subscription_history_id;
        const full_name= req.body.full_name;
        const last_degree_title=req.body.last_degree_title;
        const last_degree_from = req.body.last_degree_from;
        const gender = req.body.gender;
        const age = req.body.age;
        const appointment_fee = req.body.appointment_fee;
        const experience = req.body.experience;
        const phone_no = req.body.phone_no;
        const paypal_email=req.body.paypal_email;
        const department_id = req.body.department_id;

        var foundResult= await doctorModel.findOne({_id:doctor_id})
        if(req.files){
//-----------------------------------------------------------------------------------------
            if(req.files.profile_img){

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
                    console.log("could not find doctor with this id")
                }

                const c_result= await cloudinary.uploader.upload(req.files.profile_img[0].path)
                var profile_img = {
                     imgUrl:c_result.secure_url,
                     public_id:c_result.public_id
                     }
                    console.log(profile_img)
            }
//-----------------------------------------------------------------------------------------
            if(req.files.doc_id_card_photo_back){

                if(foundResult){
                    console.log(foundResult)
                    if(foundResult.doc_id_card_photo_back){
                        console.log(foundResult.doc_id_card_photo_back)
                        if(foundResult.doc_id_card_photo_back.public_id){
                            console.log(foundResult.doc_id_card_photo_back.public_id)
                            await cloudinary.uploader.destroy(foundResult.doc_id_card_photo_back.public_id)
                        }else{
                            console.log("could not found public_id")
                        }
                    }else{
                        console.log("could not found doc_id_card_photo_back")
                    }
                }
                else{
                    console.log("could not find doctor with this id")
                }

                const c_result= await cloudinary.uploader.upload(req.files.doc_id_card_photo_back[0].path)
                var doc_id_card_photo_back = {
                     imgUrl:c_result.secure_url,
                     public_id:c_result.public_id
                     }
                    console.log(doc_id_card_photo_back)
            }
//-----------------------------------------------------------------------------------------
            if(req.files.doc_id_card_photo_front){

                if(foundResult){
                    console.log(foundResult)
                    if(foundResult.doc_id_card_photo_front){
                        console.log(foundResult.doc_id_card_photo_front)
                        if(foundResult.doc_id_card_photo_front.public_id){
                            console.log(foundResult.doc_id_card_photo_front.public_id)
                            await cloudinary.uploader.destroy(foundResult.doc_id_card_photo_front.public_id)
                        }else{
                            console.log("could not found public_id")
                        }
                    }else{
                        console.log("could not found doc_id_card_photo_front")
                    }
                }
                else{
                    console.log("could not find doctor with this id")
                }

                const c_result= await cloudinary.uploader.upload(req.files.doc_id_card_photo_front[0].path)
                var doc_id_card_photo_front = {
                     imgUrl:c_result.secure_url,
                     public_id:c_result.public_id
                     }
                    console.log(doc_id_card_photo_front)
            }
//-----------------------------------------------------------------------------------------
            if(req.files.id_card_photo_back){

                if(foundResult){
                    console.log(foundResult)
                    if(foundResult.id_card_photo_back){
                        console.log(foundResult.id_card_photo_back)
                        if(foundResult.id_card_photo_back.public_id){
                            console.log(foundResult.id_card_photo_back.public_id)
                            await cloudinary.uploader.destroy(foundResult.id_card_photo_back.public_id)
                        }else{
                            console.log("could not found public_id")
                        }
                    }else{
                        console.log("could not found id_card_photo_back")
                    }
                }
                else{
                    console.log("could not find doctor with this id")
                }

                const c_result= await cloudinary.uploader.upload(req.files.id_card_photo_back[0].path)
                var id_card_photo_back = {
                     imgUrl:c_result.secure_url,
                     public_id:c_result.public_id
                     }
                    console.log(id_card_photo_back)
            }
//-----------------------------------------------------------------------------------------
            if(req.files.id_card_photo_front){

                if(foundResult){
                    console.log(foundResult)
                    if(foundResult.id_card_photo_front){
                        console.log(foundResult.id_card_photo_front)
                        if(foundResult.id_card_photo_front.public_id){
                            console.log(foundResult.id_card_photo_front.public_id)
                            await cloudinary.uploader.destroy(foundResult.id_card_photo_front.public_id)
                        }else{
                            console.log("could not found public_id")
                        }
                    }else{
                        console.log("could not found id_card_photo_front")
                    }
                }
                else{
                    console.log("could not find doctor with this id")
                }

                const c_result= await cloudinary.uploader.upload(req.files.id_card_photo_front[0].path)
                var id_card_photo_front = {
                     imgUrl:c_result.secure_url,
                     public_id:c_result.public_id
                     }
                    console.log(id_card_photo_front)
            }
 //-----------------------------------------------------------------------------------------
        }
        
        const result = await doctorModel.findOneAndUpdate({_id:doctor_id} , 
            
            {
            hospital_id:hospital_id,
            subscription_history_id:subscription_history_id,
            full_name:full_name,
            profile_img:profile_img,
            last_degree_from:last_degree_from,
            last_degree_title:last_degree_title,
            doc_id_card_photo_back:doc_id_card_photo_back,
            doc_id_card_photo_front:doc_id_card_photo_front,
            gender:gender,
            age:age,
            appointment_fee:appointment_fee,
            experience:experience,
            id_card_photo_front:id_card_photo_front,
            id_card_photo_back:id_card_photo_back,
            phone_no:phone_no,
            paypal_email:paypal_email,
            department_id:department_id,
            }
            ,
            {
                new:true,
                upsert:true
            })

            let notificationSaveResponse={};
        if(result){

                const isNotificationSaved= await sendNotification(result.hospital_id ,result._id , "New doctor added to your hospital." , "hospital" , "doctor" )
                if(isNotificationSaved){
                    notificationSaveResponse.message="Notification has been sent to hospital "
                }
                
            res.json({
                message: "Doctor has been saved successfully",
                result:result,
                statusCode: 201,
                notificationSaveResponse:notificationSaveResponse
            })
        }
        else{
            res.json({
                message: "could not save doctor",
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


exports.getAllDoctors = async(req,res)=>{
    
    try{
        const result = await doctorModel.find({}).populate("hospital_id").populate("subscription_history_id").populate("department_id");

        if(result){
            res.json({
                message: "All doctors fetched successfully",
                result:result,
                statusCode: 200
            })
        }else{
            res.json({
                message: "Could not fetch doctors profiles",
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

exports.getDoctorById = async(req,res)=>{
    
    try{
        const doctor_id = req.params.doctor_id;
        const result = await doctorModel.find({_id:doctor_id}).populate("hospital_id").populate("subscription_history_id").populate("department_id")

        if(result){
            res.json({
                message: "doctor fetched successfully",
                result:result,
                statusCode: 200
            })
        }else{
            res.json({
                message: "Could not fetch doctor profile with this id ",
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

exports.deleteDoctorProfile = async function(req,res){

    try{
        const doctor_id = req.params.doctor_id;
    const foundResult= await doctorModel.findOne({_id:doctor_id})

//------------------------------------------------------------------------------------------------------------------
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
        console.log("could not find doctor with this id")
    }

//------------------------------------------------------------------------------------------------------------------

if(foundResult){
    console.log(foundResult)
    if(foundResult.doc_id_card_photo_front){
        console.log(foundResult.doc_id_card_photo_front)
        if(foundResult.doc_id_card_photo_front.public_id){
            console.log(foundResult.doc_id_card_photo_front.public_id)
            await cloudinary.uploader.destroy(foundResult.doc_id_card_photo_front.public_id)
        }else{
            console.log("could not found public_id")
        }
    }else{
        console.log("could not found doc_id_card_photo_front")
    }
}
else{
    console.log("could not find doctor with this id")
}
//------------------------------------------------------------------------------------------------------------------

if(foundResult){
    console.log(foundResult)
    if(foundResult.doc_id_card_photo_back){
        console.log(foundResult.doc_id_card_photo_back)
        if(foundResult.doc_id_card_photo_back.public_id){
            console.log(foundResult.doc_id_card_photo_back.public_id)
            await cloudinary.uploader.destroy(foundResult.doc_id_card_photo_back.public_id)
        }else{
            console.log("could not found public_id")
        }
    }else{
        console.log("could not found doc_id_card_photo_back")
    }
}
else{
    console.log("could not find doctor with this id")
}
//------------------------------------------------------------------------------------------------------------------

if(foundResult){
    console.log(foundResult)
    if(foundResult.id_card_photo_back){
        console.log(foundResult.id_card_photo_back)
        if(foundResult.id_card_photo_back.public_id){
            console.log(foundResult.id_card_photo_back.public_id)
            await cloudinary.uploader.destroy(foundResult.id_card_photo_back.public_id)
        }else{
            console.log("could not found public_id")
        }
    }else{
        console.log("could not found id_card_photo_back")
    }
}
else{
    console.log("could not find doctor with this id")
}
//------------------------------------------------------------------------------------------------------------------

if(foundResult){
    console.log(foundResult)
    if(foundResult.id_card_photo_front){
        console.log(foundResult.id_card_photo_front)
        if(foundResult.id_card_photo_front.public_id){
            console.log(foundResult.id_card_photo_front.public_id)
            await cloudinary.uploader.destroy(foundResult.id_card_photo_front.public_id)
        }else{
            console.log("could not found public_id")
        }
    }else{
        console.log("could not found id_card_photo_front")
    }
}
else{
    console.log("could not find doctor with this id")
}


const result = await doctorModel.deleteOne({_id:doctor_id})

if(result.deletedCount>0){
    res.json({
        message: "doctor deleted successfully",
        result:result,
        statusCode:200
    })
}
else{
    res.json({
        message: "No any doctor deleted , doctor with this id may not exist",
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