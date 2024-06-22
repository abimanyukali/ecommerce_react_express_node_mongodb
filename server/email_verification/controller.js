const User = require('../models/Users');
const { sendOTP ,verifyOTP,deleteOTP} = require('../otp/controller');

const verifyUserEmail = async({email, otp})=>{
    try {
        const validOTP  = await verifyOTP({email,otp})
        if(!validOTP){
          throw Error("Invalid code passed. Check your inbox")  
        }
        await deleteOTP(email)
        return
    } catch (error) {
        throw error
    }
}

const sendVerificationOTPEmail = async (email) => {
  try {
    const existingUser = await User.findOne( {email});
   
    if (!existingUser) {
      throw Error("there's no account for the provided email.");
    }
    const otpDetails = {
      email,
      subject: 'Email verification',
      message: 'Verify your email with the code below',
      duration: 1,
    };
    const createOTP = await sendOTP(otpDetails);
    return createOTP;
  } catch (error) {
    throw error;
  }
};
module.exports = { sendVerificationOTPEmail,verifyUserEmail };
