import nodemailer from "nodemailer";

export const sendEmail = async ({ email, subject, message }) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail", 
    auth: {
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASSWORD, 
    },
  });

  const mailOptions = {
    from: `"YourApp" <${process.env.EMAIL_USER}>`,
    to: email,
    subject,
    text: message,
  };

  await transporter.sendMail(mailOptions);
};
