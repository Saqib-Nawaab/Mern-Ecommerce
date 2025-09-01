import nodemailer from "nodemailer";
import CONFIG from "../config/config.js";

const sendMail = async (options) => {
  try {
    const transporter = nodemailer.createTransport({
      host: CONFIG.SMTP_HOST,
      port: CONFIG.SMTP_PORT,
      service: CONFIG.SMTP_SERVICE,
      auth: {
        user: CONFIG.SMTP_USER,
        pass: CONFIG.SMTP_PASS,
      },
       tls: {
        rejectUnauthorized: false, 
      },
    }); 
  
    const mailOptions = {
      from: CONFIG.SMTP_FROM_EMAIL,
      to: options.email,
      subject: options.subject,
      text: options.message,
     html: options.html || undefined,
    };
  
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
    return info;

} catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};

export default sendMail;
