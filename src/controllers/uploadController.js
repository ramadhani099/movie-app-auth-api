function uploadImage(req, res) {
  if (!req.file) {
    return res.status(400).json({ message: 'File tidak ditemukan. Kirim form-data dengan key "file"' });
  }

  res.status(201).json({
    message: 'Upload berhasil',
    data: {
      filename: req.file.filename,
      size: req.file.size,
      url: `${process.env.BASE_URL || 'http://localhost:3000'}/uploads/${req.file.filename}`,
    },
  });
}

module.exports = { uploadImage };
