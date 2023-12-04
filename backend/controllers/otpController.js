import Twilio from "twilio";
import dotenv from "dotenv";
dotenv.config();

console.log(process.env.PORT);

const client = new Twilio(
  process.env.TWILIO_SID,
  process.env.TWILIO_AUTH_TOKEN
);
const verifyServiceSid = process.env.TWILIO_VERIFY;

const sendOtpTwlio = async (mobileNumber) => {
  try {
    await client.verify.v2.services(verifyServiceSid).verifications.create({
      to: `+91${mobileNumber}`,
      channel: `sms`,
  })

  } catch (error) {
    console.log(error.message);
    throw new Error("Failed to send the verification code");
  }
};

const verifyCodeTwilio = async (mobileNumber, code) => {
  console.log(mobileNumber);
  console.log(code);
  try {
    const verification = await client.verify.v2
      .services(verifyServiceSid)
      .verificationChecks.create({
        to: ` +91${mobileNumber}`,
        code: code,
      });

    if (verification.status === "approved") {
      // The code is valid, proceed with the sign-up process
      console.log("Verification successful!");
      return true;
      // You can implement your sign-up logic here.
    } else {
      throw new Error("Failed to verify code");

      return false;
    }
  } catch (error) {
    console.log(error.message);
    throw new Error("Failed to verify code");
  }
};

export { sendOtpTwlio, verifyCodeTwilio };
