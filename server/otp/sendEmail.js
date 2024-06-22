const nodemailer = require('nodemailer');
const { AUTH_EMAIL, AUTH_PASS } = process.env;
const transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "abimanyucseboy@gmail.com",
    pass: "jwdzeaivdflcevks",
  },
});
//test transporter

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Ready for message');
    console.log(success);
  }
});
const sendEmail = async (mailOptions) => {
  try {
    await transporter.sendMail(mailOptions);
    return;
  } catch (error) {
    throw error;
  }
};

// async function sendEmail(){
//     const info =await transporter.sendMail(mailOptions)
//     console.log("message send : %s", info.messageId);
//     return;
// }
// sendEmail().catch(console.error)
module.exports = sendEmail;
