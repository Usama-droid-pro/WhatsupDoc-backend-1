

const express = require('express');
const router = express.Router();
const controller = require("../controllers/other_patient_detailsController")

router.get("/getAllOtherPatientDetails" , controller.getAllOtherPatientDetails)
router.get("/getOtherPatientDetailsByPatientId" , controller.getPatientDetailsByPatientId)
router.delete("/deleteOtherPatientDetails" , controller.deleteOtherPatientDetails)
router.put("/updateOtherPatientDetails" , controller.updateOtherPatientDetails)





module.exports= router;