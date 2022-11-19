
const express = require('express');
const router = express.Router();
const controller = require("../controllers/patientController")
const upload= require("../middlewares/multer")

router.post("/updatePatient" , upload.fields([
    {
        name:"img",
        maxCount:1
    },
]),controller.createPatient)

router.get("/getAllPatients" , controller.getAllPatients)
router.get("/getPatientById/:patient_id" , controller.getPatientById)
router.delete("/deletePatientProfile/:patient_id" , controller.deletePatientProfile)
module.exports= router;