

const express = require('express');
const router = express.Router();
const controller = require("../controllers/notificationController")

router.get("/getAllNotifications" , controller.getAllNotifications)
router.post("/getNotificationByReceiverId" , controller.getNotificationByReceiverId)
router.put("/changeNotificationStatus" , controller.changeNotificationStatus)
router.put("/changeAllNotificationStatus" , controller.changeAllNotificationStatus)
router.delete("/deleteNotification/:notification_id" , controller.deleteNotification)
router.post("/createNotification/" , controller.createNotification)






module.exports= router;