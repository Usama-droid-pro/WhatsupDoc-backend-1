
const express = require('express');
const router = express.Router();
const controller = require("../controllers/appointmentHistoryController")


router.post("/createAppointmentHistory" , controller.createAppointmentHistory)
router.get("/getAllAppointmentHistories" , controller.getAllAppointmentHistories)
router.get("/getAppointmentHistoriesByAppointmentId/:appointment_id", controller.getAppointmentHistoryByAppointmentId)
router.get("/getAppointmentHistoriesByAppointmentHistoryId/:appointment_history_id", controller.getAppointmentHistoryByAppointmentHistoryId)

router.put("/updateAppointmentHistory", controller.updateAppointmentHistory)
router.delete("/deleteAppointmentHistory/:appointment_history_id", controller.deleteAppointmentHistory)

module.exports= router;