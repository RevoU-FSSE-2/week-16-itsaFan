const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "graham.ebert@ethereal.email",
    pass: "cCA53ZfG8jhkWBpdnh",
  },
});

const sendEmail = async (options) => {
  const mailOptions = {
    from: "graham.ebert@ethereal.email",
    to: options.to,
    subject: options.subject,
    html: options.html, 
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendEmail };
