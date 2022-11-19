
const express = require('express');
const router = express.Router();
const controller = require("../controllers/hospitalTypeController")
const auth = require("../middlewares/auth")

router.post("/createHospitalType" , controller.createHospitalType)
router.get("/getAllHospitalTypes" , controller.getAllHospitalTypes)
router.get("/getHospitalTypeById/:hospitalTypeId", controller.getHospitalTypeById)
router.put("/updateHospitalType", controller.updateHospitalType)
router.delete("/deleteHospitalType/:hospitalTypeId", controller.deleteHospitalType)

module.exports= router;