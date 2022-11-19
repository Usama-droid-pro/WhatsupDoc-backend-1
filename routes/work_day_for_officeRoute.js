
const express = require('express');
const router = express.Router();
const controller = require("../controllers/work_day_for_officeController")
const auth = require("../middlewares/auth")

router.post("/createWorkDay" , controller.createWorkDayForOffice)
router.get("/getAllWOrkDays" , controller.getAllWorkDays)
router.get("/getWorkDayById/:workDayId" , controller.getWorkDayById)
router.delete("/deleteWorkDay/:workDayId", controller.deleteWorkDay)
router.put("/updateWorkDay", controller.updateWorkDay)
router.get("/getWorkDaysOfDoctor/:doc_id", controller.getWorkDaysByDoctorId)
router.get("/getWorkDaysWithTiming", controller.getWorkDaysWithTiming)
router.get("/getWorkDaysWithTimingAndTypeOfWork", controller.getWorkDaysWithTimingAndTypeOfWork)



module.exports= router;