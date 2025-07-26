import { logError } from "@/lib/errorHandling";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

// Create a transporter using Mailtrap credentials
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT), // Convert port to number
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  greetingTimeout: 20000,
  connectionTimeout: 30000,
} as SMTPTransport.Options);

// Function to send email
export const sendEmail = async ({
  from,
  to,
  subject,
  html,
}: {
  from: string;
  to: string;
  subject: string;
  html: string;
}) => {
  try {
    // Generate email HTML using the EmailTemplate component

    const mailOptions: Mail.Options = {
      from,
      to, // Recipient email
      subject,
      html,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    logError(error, {
      action: "sendEmail",
      errorType:
        error instanceof Error ? error.constructor.name : "UnknownError",
      from,
      to,
      subject,
    });
    throw error;
  }
};
