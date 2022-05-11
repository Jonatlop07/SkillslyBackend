export default interface SendMailDTO {
  to: string;
  from: string;
  subject: string;
  text: string;
  html: string;
}
