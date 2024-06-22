const router = require('express').Router();
const CryptoJS = require('crypto-js');
const User = require('../models/Users');
const jwt = require('jsonwebtoken');
const sendEmail = require('../otp/sendEmail');
const { verifyTokenJwt } = require('./verifyToken');
const { AUTH_EMAIL } = process.env;
//REGISTER
router.post('/register', async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    isAdmin: req.body.isAdmin,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

//LOGIN

router.post('/login', async (req, res) => {
  console.log(req.body.email);
  console.log(req.body.password);
  try {
    const user = await User.findOne({
      email: req.body.email,
    });
    if (!user) {
      res.status(401).json('Wrong User mail');
    }
    if (user) {
      const hashedPassword = CryptoJS.AES.decrypt(
        user.password,
        process.env.PASS_SEC
      );

      const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

      const inputPassword = req.body.password;

      if (originalPassword != inputPassword) {
        res.status(401).json('Wrong Password');
      }
      if (originalPassword == inputPassword) {
        const accessToken = jwt.sign(
          {
            id: user._id,
            isAdmin: user.isAdmin,
          },
          process.env.JWT_SEC,
          { expiresIn: '3d' }
        );

        const { password, ...others } = user._doc;
        res.status(200).json({ ...others, accessToken });
      }
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
router.post('/forgot', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw Error('please enter valid email');
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SEC, {
      expiresIn: '1d',
    });

    const mailOptions = {
      from: 'abimanyucseboy@gmail.com',
      to: email,
      subject: 'reset password',
      text: `http://localhost:3000/reset-password/${token}`,
    };

    await sendEmail(mailOptions);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/reset-password/:token', verifyTokenJwt, async (req, res) => {
  const { id } = req.user;
  console.log(req.body.password);
  console.log(id);
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString();
  }
  try {
    await User.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
