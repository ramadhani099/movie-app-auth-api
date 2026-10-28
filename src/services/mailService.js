const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: Number(process.env.EMAIL_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Langkah Keenam (no. 6): function sendmail untuk mengirim token via nodemailer
async function sendMail(to, token) {
  const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
  const link = `${baseUrl}/verify-email?token=${token}`;

  await transporter.sendMail({
    from: `"Movie App" <${process.env.EMAIL_USER}>`,
    to,
    subject: 'Verifikasi Akun Movie App',
    html: `
      <h3>Selamat datang di Movie App!</h3>
      <p>Klik link berikut untuk memverifikasi akunmu:</p>
      <p><a href="${link}">${link}</a></p>
      <p>Atau gunakan token ini: <b>${token}</b></p>
    `,
  });
}

module.exports = { sendMail };
