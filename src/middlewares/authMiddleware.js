const jwt = require('jsonwebtoken');

// Langkah Keempat: middleware untuk memeriksa token
function verifyToken(req, res, next) {
  // Cek apakah ada token di header
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Autentikasi gagal: token tidak ditemukan' });
  }

  // Format header: "Bearer <token>" (atau langsung token)
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;

  try {
    // Cek validitas token dengan secret key yang sama seperti saat login
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next(); // token valid, lanjutkan request
  } catch (err) {
    return res.status(401).json({ message: 'Autentikasi gagal: token tidak valid atau kedaluwarsa' });
  }
}

module.exports = { verifyToken };
