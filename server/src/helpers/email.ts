import SendinBlueTransport from 'nodemailer-sendinblue-transport';
//import SendinBlueTransport from '../types/nodemailer-sendinblue-transport';
import { createTransport } from 'nodemailer'
import { ExpressError } from "./ExpressError";
import { email_address, email_port, sendinblue_key } from "../config";

const transporter = baseTransporter()

function baseTransporter() {
  let num_email_port
  if (email_port) num_email_port = +email_port
  if (!sendinblue_key) throw new ExpressError(500, "Sendinblue API key not found.")

  // return createTransport({
  //   host: email_host,
  //   port: num_email_port,
  //   auth: {
  //     user: email_address,
  //     pass: email_password
  //   }
  // })

  return createTransport(new SendinBlueTransport({
    apiKey: sendinblue_key,
  }));
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

/** `<p>Click this link to verify your email: https://yourdomain.com/verify?token=your_token</p>` */