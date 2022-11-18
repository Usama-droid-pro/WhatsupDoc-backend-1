

const express = require('express');
const router = express.Router();
const controller = require("../controllers/hospital_ratingController")


router.post("/rateHospital" , controller.rateHospital )
router.get("/getAllHospitalsRatings", controller.getHospitalRating)
router.get("/getTotalHospitalRating/:hospital_id" , controller.getTotalHospitalRating)
router.delete("/deleteHospitalRating/:hospitalRatingId" , controller.deleteHospitalRating)


module.exports= router;