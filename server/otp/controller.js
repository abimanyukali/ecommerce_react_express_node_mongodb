const OTP = require('./Otp');
const generateOTP = require('./generateOTP');
const sendEmail = require('./sendEmail');
const { hashData, verifyHashedData } = require('../util/hashData');
const { AUTH_EMAIL } = process.env;

const sendOTP = async ({ email, subject, message, duration = 1 }) => {
  try {
    if (!(email && subject && message)) {
      throw Error('Provide values for email,subject,message');
    }
    //clear any old record
    await OTP.deleteOne({ email });
    //generate pin
    const generateotp = await generateOTP();
    //send email
    const mailOptions = {
      from: AUTH_EMAIL,
      to: email,
      subject,
      html: `<p>${message}</p><p style="color:tomato;font-size:25px;letter-spacing:2px;"><b>${generateotp}</b></p>
        <p>This code <b>expires in ${duration} hour(s)</b></p>
        `,
    };
    await sendEmail(mailOptions);
    //save otp record
    const hashedOTP = await hashData(generateotp);
    const newOTP = await new OTP({
      email,
      otp: hashedOTP,
      createdAt: Date.now(),
      expiresAt: Date.now() + 3600000 * +duration,
    });
    const createOTPRecord = await newOTP.save();
    return createOTPRecord;
  } catch (error) {
    throw error;
  }
};

const verifyOTP = async ({ email, otp }) => {
  try {
    if (!(email && otp)) {
      throw Error('Provide Values for email, otp ');
    }
    //ensure otp record exists
    const matchedOTPRecord = await OTP.findOne({
      email,
    });
    if (!matchedOTPRecord) {
      throw Error('no otp records found');
    }
    //checking for expired code
    const { expiresAt } = matchedOTPRecord;
    if (expiresAt < Date.now()) {
      await OTP.deleteOne({ email });
      throw Error('code has expired. Request for a new one.');
    }
    //not expired yet ,verify value
    const hashedOTP = matchedOTPRecord.otp;
    const validOTP = await verifyHashedData(otp, hashedOTP);
    return validOTP;
  } catch (error) {
    throw error;
  }
};

//delete otp
const deleteOTP = async (email) => {
  try {
    await OTP.deleteOne({ email });
  } catch (error) {
    throw error;
  }
};
module.exports = { sendOTP, verifyOTP,deleteOTP };
