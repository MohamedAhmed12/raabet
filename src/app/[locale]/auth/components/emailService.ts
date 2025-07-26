import { logError } from "@/lib/errorHandling";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

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
    // Create a transporter using Mailtrap credentials
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT), // Convert port to number
      secure:
        process.env.NODE_ENV === "production"
          ? true
          : process.env.MAIL_SECURE === "true"
          ? true
          : false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      greetingTimeout: 20000,
      connectionTimeout: 30000,
    } as SMTPTransport.Options);

    // Generate email HTML using the EmailTemplate component
    console.log("process.env.MAIL_SECURE", process.env.MAIL_SECURE);

    const mailOptions: Mail.Options = {
      from,
      to, // Recipient email
      subject,
      html,
      headers: {
        "X-Entity-Ref-ID": crypto.randomUUID(),
        "Message-ID": `<${Date.now()}@rabet-link.com>`,
        "List-Unsubscribe": `<mailto:unsubscribe@rabet-link.com?subject=Unsubscribe>`,
      },
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
