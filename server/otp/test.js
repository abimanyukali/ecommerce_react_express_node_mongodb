const nodemailer = require("nodemailer");
const { AUTH_EMAIL, AUTH_PASS } = process.env;

const transporter = nodemailer.createTransport({
 service:"gmail",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user:"abimanyucseboy@gmail.com",
    pass: "jwdzeaivdflcevks",
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"abimanyu Foo Koch 👻" <abimanyucseboy@gmail.com>', // sender address
    to: "abiabimanyu350@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

main().catch(console.error);
