

const express = require('express');
const router = express.Router();
const controller = require("../controllers/searchController")
const auth = require("../middlewares/auth")

router.get("/search" , controller.Search )


module.exports= router;