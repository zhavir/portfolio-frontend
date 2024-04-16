import axios from 'axios';

const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1`,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

export async function sendContactMeEmail(emailFrom, subject, text) {
  const data = {
    from_email: emailFrom,
    subject: subject,
    text: text,
  };
  console.log(data);
  try {
    return await instance.post('/contact-me/', data);
  } catch (error) {
    console.log(`unable to send email ${error}`);
  }
}
