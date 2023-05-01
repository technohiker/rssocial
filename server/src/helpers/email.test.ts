import SendinBlueTransport from 'nodemailer-sendinblue-transport';
//import SendinBlueTransport from '../types/nodemailer-sendinblue-transport';
import { createTransport } from 'nodemailer'
import { ExpressError } from "./ExpressError";
import { sendEmail } from './email'; 
import { sendinblue_key } from '../config';

describe("base transporter", () => {
    test("connects to SendinBlue", () => {
        if(!sendinblue_key) return
        const transporter = createTransport(new SendinBlueTransport({
            apiKey: sendinblue_key,
          }));
    })
    test("sends email", () => {
        //How to mock this?
    })
})