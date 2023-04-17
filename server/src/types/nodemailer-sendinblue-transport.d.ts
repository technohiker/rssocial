//How do I get this into the email.ts?  Right now this is stuck in node_modules.
declare module 'nodemailer-sendinblue-transport' {
  import { Transport } from 'nodemailer';
  //function SendinBlueTransport(options: SendinBlueTransportOptions): Transport;
  export class SendinBlueTransport {
    constructor(options: SendinBlueTransportOptions)
  }
  interface SendinBlueTransportOptions {
    apiKey: string;
    timeout?: number;
    host?: string;
    port?: number;
    path?: string;
    secure?: boolean;
  }
  export default SendinBlueTransport;
}