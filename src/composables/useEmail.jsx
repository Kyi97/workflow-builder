import emailjs from "@emailjs/browser";
import { EMAILJS_CONFIG } from "../utils/constant";

const sendEmailWithEmailJS = async ({ recipient, subject, body }) => {
  const templateParams = {
    to_email: recipient,
    subject,
    message: body,
  };

  // Send email
  try {
    const { SERVICE_ID, TEMPLATE_ID, USER_ID } = EMAILJS_CONFIG;
    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams,
      USER_ID
    );

    return response;
  } catch (error) {
    const errorMessage =
      error.text || error.message || "Failed to send email using EmailJS";
    throw new Error(errorMessage);
  }
};

export default sendEmailWithEmailJS;
