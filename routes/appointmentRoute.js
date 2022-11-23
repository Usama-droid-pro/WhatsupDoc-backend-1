
const express = require('express');
const router = express.Router();
const controller = require("../controllers/appointmentController")
const upload= require("../middlewares/multer")


router.post("/createAppointment", upload.array("images"), controller.createAppointment)
router.get("/getAllAppointments" , controller.getAllAppointments)
router.get("/getAppointmentByAppointmentId" , controller.getAppointmentByAppointmentId)
router.get("/getAllDoctorAppointments" , controller.getAllDoctorAppointments)
router.get("/getAllAppointmentsOfPatient" , controller.getAllAppointmentsOfPatient)
router.put("/changeAppointmentStatus" , controller.changeAppointmentStatus)
router.delete("/deleteAppointment" , controller.deleteAppointment)
router.put("/updateAppointment" ,upload.array("images"), controller.updateAppointment)
router.get("/getDoctorAppointmentsByTypeOfWork",controller.getDoctorAppointmentsByTypeOfWork)
router.get("/getDoctorsPatients",controller.getDoctorsPatients)
router.get("/getPatientAppointmentsWithDoctor",controller.getPatientAppointmentsWithDoctors)








module.exports= router;