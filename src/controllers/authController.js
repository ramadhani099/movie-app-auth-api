const authService = require('../services/authService');

async function register(req, res) {
  const { fullname, username, password, email } = req.body;
  if (!fullname || !username || !password || !email) {
    return res.status(400).json({ message: 'fullname, username, password, dan email wajib diisi' });
  }

  try {
    const user = await authService.register({ fullname, username, password, email });
    res.status(201).json({
      message: user.emailSent
        ? 'Registrasi berhasil. Cek email kamu untuk verifikasi.'
        : 'Registrasi berhasil, tetapi email verifikasi gagal dikirim.',
      data: user,
    });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'email dan password wajib diisi' });
  }

  try {
    const result = await authService.login({ email, password });
    res.status(200).json({ message: 'Login berhasil', ...result });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
}

async function verifyEmail(req, res) {
  try {
    const message = await authService.verifyEmail(req.query.token);
    res.status(200).json({ message });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
}

module.exports = { register, login, verifyEmail };
