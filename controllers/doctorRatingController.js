
const mongoose= require("mongoose");

const doctorRatingModel= require("../models/doctorRatingModel")

exports.rateDoctor= async (req,res)=>{
    try{
        const patient_id=req.body.patient_id;
        const doctor_id=req.body.doctor_id;
        const review = req.body.review;
        const stars_rate = req.body.stars_rate;

        const foundResult= await doctorRatingModel.findOne({patient_id: patient_id , doctor_id:doctor_id});
        

        if(stars_rate<=5){
            if(!foundResult){
                var rating = new doctorRatingModel({
                    _id:mongoose.Types.ObjectId(),
                    doctor_id:doctor_id,
                    patient_id: patient_id,
                    review:review,
                    stars_rate:stars_rate
                })
                var result= await rating.save();
    
            }
    
            if(foundResult){
                var result = await doctorRatingModel.findOneAndUpdate({doctor_id:doctor_id, patient_id:patient_id}
                    ,
                    {
                      review:review,
                      stars_rate:stars_rate,
                      doctor_id:doctor_id,
                      patient_id:patient_id
                    },
                    {
                        new:true
                    }
                    )
            }
    
            if(result){
                res.json({
                    message: "Your rating has been recorded",
                    result:result,
                    statusCode:200
                })
            }
            else{
                res.json({
                    message: "Could not update or add your rating",
                    result:null
                })
            }
    
        }
        else{
            res.json({
                message: "Stars rate can not exceed 5",
                success:false,
            })
        }
        

    }
    catch(err){
        res.json({
            message: "Error",
            error:err.message,
            statusCode:500
        })
    }

}

exports.getDoctorRating = (req,res) =>{
    doctorRatingModel.find({}, (err , result)=>{ 
        try{
            res.json({
                message: "All fetch doctor Ratings are :",
                data: result
            })
        }
        catch(err){
            res.json({
                message: "Error in fetching doctor Ratings",
                Error: err.message,
                error: err
            })
        }

    })
}

exports.getDoctorRatingByDoctorId = async (req,res) =>{

    try{
        const doctorId = req.query.doctorId;
        const result = await doctorRatingModel.find({doctor_id:doctorId}).populate("patient_id");

    if(result){
        res.json({
            message: "fetched",
            status:true,
            result:result
        })
    }
    else{
        res.json({
            message: "Could not fetch",
            status:false,
        })
    }
    }
    catch(err){
        res.json({
            message: "error",
            error:err.message
        })
    }
    

}

exports.getTotalDoctorRating= (req,res) =>{
    const doctor_id = req.params.doctor_id;
    let totalRating=0
    doctorRatingModel.find({doctor_id:doctor_id}, (err , result)=>{ 
        console.log(result.length>0)
        if(result.length>0){
            const count=result.length;
        if(count>0){
            result.forEach(element => {
                totalRating=(element.stars_rate+totalRating);
                
            });
            
            let rating=totalRating/count;
             console.log(rating);
             try{
                if(result){
                    res.json({
                        message:"Total rating of This doctor Id:"+ doctor_id,
                        totalRating:rating,
                        totalRatingCount:count
                    })
                }  
                else{
                    res.json({
                        status:false,
                        message: "not found for this doctor Id"
                    })
                }
                
             }
             catch(err){
                res.json(err)
             }
        }
        }
        else{
            res.json({
                message: "Not found ",
                status:false
            })
        }
        
    })
}

exports.deleteDoctorRating = async (req,res)=>{
    try{
        const doctorRatingId = req.params.doctorRatingId;

        const result= await doctorRatingModel.deleteOne({_id:doctorRatingId});
        if(result.deletedCount>0){
            res.json({
                message: "doctor rating deleted successfully",
                result: result,
                statusCode:200
            })
        }
        else{
            res.json({
                message: "doctor rating not deleted , rating with this id may not exist",
                result:null,
            })
        }
    }
    catch(err){
        res.json({
            message:"Error ",
            error:err.message,
        })
    }
}