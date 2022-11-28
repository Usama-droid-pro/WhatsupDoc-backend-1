

const express = require('express');
const router = express.Router();
const controller = require("../controllers/doctorRatingController")


router.post("/rateDoctor" , controller.rateDoctor )
router.get("/getAllDoctorsRatings", controller.getDoctorRating)
router.get("/getTotalDoctorRating/:doctor_id" , controller.getTotalDoctorRating)
router.delete("/deleteDoctorRating/:doctorRatingId" , controller.deleteDoctorRating)
router.get("/getDoctorRatingById" , controller.getDoctorRatingByDoctorId)
// router.get("/getDoctorsWithRatings" , controller.getDoctorsByRating)



module.exports= router;