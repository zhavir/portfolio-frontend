import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL
    ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1`
    : '/api/v1',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
  validateStatus: (status) => {
    return status >= 200 && status < 300;
  },
});

export async function sendContactMeEmail(emailFrom, subject, text) {
  const data = {
    from_email: emailFrom,
    subject: subject,
    text: text,
  };
  return await instance.post('/contact-me/', data);
}

export async function generateCurriculum() {
  return await instance.post('/curriculum/');
}
