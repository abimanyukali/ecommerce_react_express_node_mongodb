const express =require("express")
const router = express.Router()
const userRoute = require("../otp/")
const EmailVerificationRoutes =require("../email_verification")

router.use("/otp",userRoute)
router.use("/email_verification",EmailVerificationRoutes)
module.exports= router