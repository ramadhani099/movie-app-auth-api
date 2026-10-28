const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const movieController = require('../controllers/movieController');
const uploadController = require('../controllers/uploadController');
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../services/uploadService');

// Auth
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/verify-email', authController.verifyEmail);
router.get('/verifikasi-email', authController.verifyEmail); // alias sesuai teks Langkah Keenam

// Movie (butuh token) -> /movie dan /movies sama-sama bisa dipakai
router.get('/movie', authMiddleware.verifyToken, movieController.getList);
router.get('/movies', authMiddleware.verifyToken, movieController.getList);

// Upload gambar (Langkah Ketujuh no. 4). Key form-data: "file"
router.post('/upload', upload.single('file'), uploadController.uploadImage);

module.exports = router;
