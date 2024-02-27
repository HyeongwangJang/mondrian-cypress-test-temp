import nodemailer from 'nodemailer';
import sgTransport from 'nodemailer-sendgrid-transport';

const sendAnEmail = (title, message, apiKey, from, to) => {
  const options = {
    auth: {
      api_key: apiKey
    }
  }
  const client = nodemailer.createTransport(sgTransport(options));

  const email = {
    from: from,
    to: to,
    subject: `${title} 몬드리안 서버 테스트`,
    text: message,
    html: `
      <h1>몬드리안 서버 테스트 결과</h1>
      <h2>${title}</h2>
      <hr>
      <p>${message}</p>
    `,
  };
  return new Promise((resolve) => {
    client.sendMail(email, function(err, info) {
      resolve(err ? err.message : 'Message sent: ' + info.response);
    })
  });
}

export default sendAnEmail;
