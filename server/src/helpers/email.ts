import SendinBlueTransport from 'nodemailer-sendinblue-transport';
import { createTransport } from 'nodemailer'
import { ExpressError } from "./ExpressError";
import { BCRYPT_WORK_FACTOR, backend_url, email_address, email_port, sendinblue_key } from "../config";
import bcrypt from 'bcrypt';
import { createToken } from './tokens';

const transporter = baseTransporter()

//TODO: Right now running the server requires a SendinBlue account.  
//Any way to work around this in case of testing?

/** Create transporter object that will be used for sending emails later. */
function baseTransporter() {
  let num_email_port;
  if (email_port) num_email_port = +email_port
  if (!sendinblue_key) throw new ExpressError(500, "Sendinblue API key not found.")

  return createTransport(new SendinBlueTransport({
    apiKey: sendinblue_key,
  }));
}

export async function sendVerifyEmail(username: string, email: string, id: number) {

  //Generate code for verification, then email it to user.
  const hashValue = await bcrypt.hash(username + email, BCRYPT_WORK_FACTOR)

  const verifyToken = createToken({
    id: id,
    hash: hashValue
  }, { expiresIn: '1w' })
  console.log({ verifyToken })

  const verifyHTML = `<p>Click this link to verify your email: ${backend_url}/verify?verToken=${verifyToken}</p>`

  sendEmail(email, "Verify Account", verifyHTML)
}

export async function sendEmail(receiver: string, subject: string, message: string) {
  try {
    let mailOptions = {
      from: email_address,
      to: receiver,
      subject: subject,
      html: message
    }

    console.log({ transporter })
    console.log({ mailOptions })

    const info = await transporter.sendMail(mailOptions)
    console.log({ info })
  }
  catch (e: any) {
    throw new ExpressError(e)
  }
}