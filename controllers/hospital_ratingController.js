
const mongoose= require("mongoose");

const hospitalRatingModel= require("../models/hospital_ratingModel")

exports.rateHospital= async (req,res)=>{
    try{
        const patient_id=req.body.patient_id;
        const hospital_id=req.body.hospital_id;
        const review = req.body.review;
        const stars_rate = req.body.stars_rate;

        const foundResult= await hospitalRatingModel.findOne({patient_id: patient_id , hospital_id:hospital_id});
        

        if(stars_rate<=5){
            if(!foundResult){
                var rating = new hospitalRatingModel({
                    _id:mongoose.Types.ObjectId(),
                    hospital_id:hospital_id,
                    patient_id: patient_id,
                    review:review,
                    stars_rate:stars_rate
                })
                var result= await rating.save();
    
            }
    
            if(foundResult){
                var result = await hospitalRatingModel.findOneAndUpdate({hospital_id:hospital_id, patient_id:patient_id}
                    ,
                    {
                      review:review,
                      stars_rate:stars_rate,
                      hospital_id:hospital_id,
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

exports.getHospitalRating = (req,res) =>{
    hospitalRatingModel.find({}, (err , result)=>{ 
        try{
            res.json({
                message: "All fetch hospital Ratings are :",
                data: result
            })
        }
        catch(err){
            res.json({
                message: "Error in fetching hospital Ratings",
                Error: err.message,
                error: err
            })
        }

    })
}

exports.getTotalHospitalRating= (req,res) =>{
    const hospital_id = req.params.hospital_id;
    let totalRating=0
    hospitalRatingModel.find({hospital_id:hospital_id}, (err , result)=>{ 
        const count=result.length;
        if(count>0){
            result.forEach(element => {
                totalRating=(element.stars_rate+totalRating);
                
            });
            
            let rating=totalRating/count;
             console.log(rating);
             try{
                res.json({
                    message:"Total rating of This hospital Id:"+ hospital_id,
                    totalRating:rating,
                    totalRatingCount:count
                })
             }
             catch(err){
                res.json(err)
             }
        }
    })
}

exports.deleteHospitalRating = async (req,res)=>{
    try{
        const hospitalRatingId = req.params.hospitalRatingId;

        const result= await hospitalRatingModel.deleteOne({_id:hospitalRatingId});
        if(result.deletedCount>0){
            res.json({
                message: "Hospital rating deleted successfully",
                result: result,
                statusCode:200
            })
        }
        else{
            res.json({
                message: "hospital rating not deleted , rating with this id may not exist",
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