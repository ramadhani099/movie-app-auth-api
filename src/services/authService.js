const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const db = require('../config/db');
const { sendMail } = require('./mailService');

// Langkah Kedua + Keenam: register (INSERT user + token verifikasi)
async function register({ fullname, username, password, email }) {
  // Cek email / username sudah dipakai atau belum
  const [exist] = await db.query(
    'SELECT id FROM users WHERE email = ? OR username = ?',
    [email, username]
  );
  if (exist.length > 0) {
    const err = new Error('Email atau username sudah terdaftar');
    err.status = 409;
    throw err;
  }

  // Enkripsi password sebelum disimpan
  const hashedPassword = await bcrypt.hash(password, 10);

  // Generate token unik untuk verifikasi email
  const token = uuidv4();

  // INSERT data user + token ke database
  const [result] = await db.query(
    `INSERT INTO users (fullname, username, password, email, verification_token)
     VALUES (?, ?, ?, ?, ?)`,
    [fullname, username, hashedPassword, email, token]
  );

  // Kirim email verifikasi. Kalau gagal kirim, register tetap berhasil.
  let emailSent = true;
  try {
    await sendMail(email, token);
  } catch (e) {
    emailSent = false;
    console.error('Gagal mengirim email:', e.message);
  }

  return { id: result.insertId, fullname, username, email, emailSent };
}

// Langkah Ketiga: login
async function login({ email, password }) {
  // 1. Cek user berdasarkan email
  const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
  if (rows.length === 0) {
    const err = new Error('Email atau password yang dimasukkan salah');
    err.status = 401;
    throw err;
  }
  const user = rows[0];

  // 2. Cocokkan password dengan bcrypt.compare
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    const err = new Error('Email atau password yang dimasukkan salah');
    err.status = 401;
    throw err;
  }

  // 3. Buat token dengan jsonwebtoken
  const token = jwt.sign(
    { id: user.id, username: user.username, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
  );

  return { token, user: { id: user.id, fullname: user.fullname, username: user.username, email: user.email } };
}

// Langkah Keenam (no. 7 & 8): verifikasi email berdasarkan token
async function verifyEmail(token) {
  if (!token) {
    const err = new Error('Invalid Verification Token');
    err.status = 400;
    throw err;
  }

  const [rows] = await db.query('SELECT id FROM users WHERE verification_token = ?', [token]);
  if (rows.length === 0) {
    const err = new Error('Invalid Verification Token');
    err.status = 400;
    throw err;
  }

  await db.query('UPDATE users SET is_verified = 1, verification_token = NULL WHERE id = ?', [rows[0].id]);
  return 'Email Verified Successfully';
}

module.exports = { register, login, verifyEmail };
