import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

// Create a transporter using Mailtrap credentials
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT), // Convert port to number
  secure: process.env.NODE_ENV !== "development",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
} as SMTPTransport.Options);

// Function to send email
export const sendEmail = async ({
  from,
  to,
  subject,
  html
}: {
  from: string;
  to: string;
  subject: string;
  html:string;
}) => {
  try {
    // Generate email HTML using the EmailTemplate component

    const mailOptions: Mail.Options = {
      from,
      to, // Recipient email
      subject,
      html,
    };
    console.log(22, mailOptions);

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.messageId);

    return info;
  } catch (error) {
    console.error("Failed to send activation email:", error);
    throw error;
  }
};
