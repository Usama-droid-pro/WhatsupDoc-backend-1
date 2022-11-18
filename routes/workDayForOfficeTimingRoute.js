
const express = require('express');
const router = express.Router();
const controller = require("../controllers/work_day_for_office_timingController")


router.post("/createWorkDayForOfficeTiming" , controller.createWorkDayForOfficeTiming)
router.get("/getAllWOrkDaysForOfficeTiming" , controller.getAllWorkDaysForOfficeTiming)
router.get("/getWorkDayOfficeTimingById/:workDayOfficeTimingId" , controller.getWorkDayForOfficeTimingById)
router.delete("/deleteWorkDayOfficeTiming/:workDayOfficeTimingId", controller.deleteWorkDayForOfficeTiming)
router.put("/updateWorkDayForOfficeTiming", controller.updateWorkDayForOfficeTiming)
router.get("/getWorkDayForOfficeTimingByWork_id/:work_id", controller.getWorkDayForOfficeTimingByWork_id)

module.exports= router;