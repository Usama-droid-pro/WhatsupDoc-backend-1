
const express = require('express');
const router = express.Router();
const controller = require("../controllers/hospitalController")
const auth = require("../middlewares/auth")
const upload= require("../middlewares/multer")

router.post("/updateHospital" , upload.fields([
    {
        name:"profile_img",
        maxCount:1
    },{
        name:"img",
        maxCount:100
    }
]),controller.updateHospital)

router.get("/getAllHospitals" , controller.getAllHospitals)
router.get("/getHospitalById/:hospital_id" , controller.getHospitalById)
router.delete("/deleteHospitalProfile/:hospital_id" , controller.deleteHospitalProfile)
module.exports= router;