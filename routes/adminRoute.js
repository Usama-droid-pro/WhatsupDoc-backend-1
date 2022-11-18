const express = require('express');
const router = express.Router();
const controller = require("../controllers/adminController")
const auth = require("../middlewares/auth")
const upload = require("../middlewares/multer")


router.put("/updateAdminProfile", upload.single("img") ,controller.updateAdminProfile)
router.post("/getAdminProfile", controller.getAdminProfile)
router.get("/getAllAdminProfiles", controller.getAllAdminProfile)
router.delete("/deleteAdminProfile/:admin_id", controller.deleteAdminProfile)


module.exports= router;