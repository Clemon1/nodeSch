import nodemailer from 'nodemailer';
import Email from '../model/emailModel.js';
import mongoose from 'mongoose';
const dbUrl = 'mongodb://127.0.0.1:27017/NanoDB';

const dbCon = async ({ messageId, email, message }) => {
  try {
    await mongoose
      .connect(dbUrl)
      .then(() => console.log('connection to db successful'));
    const body = {
      messageId,
      email,
      message,
    };
    await Email.create(body);
    await mongoose.connection.close(() => console.log('disconnected from db'));
  } catch (error) {
    console.log(error?.message);
  }
};

const sendEmail = async ({ userId, subject, email, message }) => {
  // create transporter object using default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'us2.smtp.mailhostbox.com',
    port: 587,
    secure: false,
    auth: {
      user: 'freelance@joshdev.tech', //email account nodemailer connects to
      pass: 'x@pummj2', //password of user account
    },
    pool: true,
    maxConnections: 10,
    maxMessages: 100,
    rateDelta: 1000,
    rateLimit: 10,
  });

  let info = await transporter.sendMail({
    from: `Freelance site <freelance@joshdev.tech>`,
    to: email,
    subject: subject,
    html: message,
  });
  await dbCon({ messageId: info.messageId, email, message });
  console.log('Message sent: %s', info.messageId);
};
export default sendEmail;
