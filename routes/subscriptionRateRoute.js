const express = require('express');
const router = express.Router();
const controller = require("../controllers/subscriptionRateController")
const auth = require("../middlewares/auth")
const upload = require("../middlewares/multer")




router.post("/createSubscriptionRate" , controller.createSubscription)
router.get("/getAllSubscriptions" , controller.getAllSubscriptions)
router.get("/getSubscriptionsById/:subscriptionRateId" , controller.getSubscriptionById)
router.delete("/deleteSubscriptions/:subscriptionRateId" , controller.deleteSubscriptionRate)
router.put("/updateSubscriptionRate" , controller.updateSubscriptionRate)





module.exports= router;