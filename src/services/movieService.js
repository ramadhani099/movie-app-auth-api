const db = require('../config/db');

// Kolom yang boleh dipakai untuk sorting (whitelist, supaya aman dari SQL injection)
const SORTABLE = ['id', 'title', 'genre', 'release_year', 'rating', 'created_at'];

// Langkah Kelima: GET all DATA dengan filter, sort, dan search
async function getAll({ genre, sortBy, order, search }) {
  let sql = 'SELECT * FROM movies';
  const conditions = [];
  const params = [];

  // 1. Filtering -> WHERE
  if (genre) {
    conditions.push('genre = ?');
    params.push(genre);
  }

  // 3. Search -> WHERE + LIKE
  if (search) {
    conditions.push('title LIKE ?');
    params.push(`%${search}%`);
  }

  if (conditions.length > 0) {
    sql += ' WHERE ' + conditions.join(' AND ');
  }

  // 2. Sorting -> ORDER BY
  if (sortBy) {
    const column = SORTABLE.includes(sortBy) ? sortBy : 'id';
    const direction = String(order).toLowerCase() === 'desc' ? 'DESC' : 'ASC';
    sql += ` ORDER BY ${column} ${direction}`;
  }

  const [rows] = await db.query(sql, params);
  return rows;
}

module.exports = { getAll };
