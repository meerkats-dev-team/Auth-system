import nodemailer from "nodemailer";
import { AUTH_PASSWORD, AUTH_USER_EMAIL } from "../config/env";

const transporter: nodemailer.Transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: AUTH_USER_EMAIL,
    pass: AUTH_PASSWORD,
  },
});

// Verify connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.error("SMTP configuration error:", error);
  } else {
    console.log("Server is ready to take our messages:", success);
  }
});

const sendEmail = async (userEmail: string, subject: string, text: string) => {
  const mailOptions = {
    from: `Auth system <${AUTH_USER_EMAIL}>`,
    to: userEmail,
    subject: subject,
    text: text,
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log("Verification email sent successfully.");
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send verification email");
  }
};
export default sendEmail;
