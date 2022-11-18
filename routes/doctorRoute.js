
const express = require('express');
const router = express.Router();
const controller = require("../controllers/doctorController")
const auth = require("../middlewares/auth")
const upload= require("../middlewares/multer")

router.post("/updateDoctor" , upload.fields([
    {
        name:"profile_img",
        maxCount:1
    },{
        name:"doc_id_card_photo_back",
        maxCount:1
    },
    {
        name:"doc_id_card_photo_front",
        maxCount:1
    },
    {
        name:"id_card_photo_front",
        maxCount:1
    },
    {
        name:"id_card_photo_back",
        maxCount:1
    }

]),controller.createDoctor)

router.get("/getAllDoctors" , controller.getAllDoctors)
router.get("/getDoctorById/:doctor_id" , controller.getDoctorById)
router.delete("/deleteDoctorProfile/:doctor_id" , controller.deleteDoctorProfile)
module.exports= router;