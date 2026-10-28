# Movie App API

REST API dengan Node.js, Express, dan MySQL. Fitur: register, login (JWT), middleware auth, filter/sort/search, verifikasi email (nodemailer), dan upload gambar (multer).

## Cara menjalankan

1. Install dependency:
   ```bash
   npm install
   ```
2. Buat database dan tabel:
   ```bash
   mysql -u root -p < database.sql
   ```
3. Salin `.env.example` menjadi `.env`, lalu isi password database, `JWT_SECRET`, dan akun email (untuk Gmail pakai App Password).
4. Jalankan server:
   ```bash
   npm run dev
   ```

## Endpoint

| Endpoint | Method | Auth | Keterangan |
|---|---|---|---|
| `/register` | POST | - | Body JSON: `fullname`, `username`, `password`, `email` |
| `/login` | POST | - | Body JSON: `email`, `password`. Mengembalikan token JWT |
| `/verify-email?token=...` | GET | - | Verifikasi token dari email |
| `/movie` (atau `/movies`) | GET | Bearer token | Query: `genre`, `sortBy`, `order` (asc/desc), `search` |
| `/upload` | POST | - | form-data, key `file` (gambar, maks 2 MB) |

## Contoh pengujian di Postman

1. `POST /register` dengan body JSON:
   ```json
   { "fullname": "Rama Dhani", "username": "rama", "password": "rahasia123", "email": "rama@example.com" }
   ```
2. Buka email, klik link verifikasi (atau `GET /verify-email?token=<token>`).
3. `POST /login` lalu salin `token` dari respons.
4. `GET /movie?genre=Sci-Fi&sortBy=rating&order=desc&search=in` dengan header `Authorization: Bearer <token>`.
5. `POST /upload` pada tab Body pilih form-data, key `file` bertipe File.

## Struktur

```
src/
  app.js
  config/db.js
  routes/index.js
  controllers/   (auth, movie, upload)
  services/      (auth, movie, mail, upload)
  middlewares/authMiddleware.js
uploads/         (tempat file hasil upload)
database.sql
```
