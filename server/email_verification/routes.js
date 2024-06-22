const express = require('express');
const router = express.Router();
const { sendVerificationOTPEmail, verifyUserEmail } = require('./controller');

router.post('/verify', async (req, res) => {
  try {
    let { email, otp } = req.body;
    if (!(email && otp)) throw Error('Empty otp details are not allowed');
    await verifyUserEmail({ email, otp });
    res.status(200).json({ email, verified: true });
  } catch (error) {
    res.status(400).send(error.messages)
  }
});
// request new verification otp
router.post('/', async (req, res) => {
  try {
    const { email } = req.body;
    console.log(email);
    if (!email) throw Error('An email is required!');

    const createEmailVerificationOTP = await sendVerificationOTPEmail(email);
    res.status(200).json(createEmailVerificationOTP);
  } catch (error) {
    res.status(400).send(error.messages);
  }
});
module.exports = router;
