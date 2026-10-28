-- Jalankan file ini di MySQL: mysql -u root -p < database.sql
CREATE DATABASE IF NOT EXISTS movie_app;
USE movie_app;

-- Langkah Pertama: entitas User
-- Langkah Keenam: field baru untuk menyimpan token verifikasi (verification_token, is_verified)
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  fullname VARCHAR(100) NOT NULL,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  verification_token VARCHAR(100) NULL,
  is_verified TINYINT(1) NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabel movie (dari mission sebelumnya, dibuat ulang di sini)
CREATE TABLE IF NOT EXISTS movies (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  genre VARCHAR(50) NOT NULL,
  release_year INT,
  rating DECIMAL(3,1),
  poster VARCHAR(255) NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO movies (title, genre, release_year, rating) VALUES
  ('Inception', 'Sci-Fi', 2010, 8.8),
  ('The Dark Knight', 'Action', 2008, 9.0),
  ('Interstellar', 'Sci-Fi', 2014, 8.7),
  ('Parasite', 'Drama', 2019, 8.5),
  ('Spirited Away', 'Animation', 2001, 8.6),
  ('The Conjuring', 'Horror', 2013, 7.5),
  ('Mad Max: Fury Road', 'Action', 2015, 8.1);
