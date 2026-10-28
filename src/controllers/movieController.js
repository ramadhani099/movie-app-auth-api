const movieService = require('../services/movieService');

async function getList(req, res) {
  try {
    const { genre, sortBy, order, search } = req.query;
    const data = await movieService.getAll({ genre, sortBy, order, search });
    res.status(200).json({ message: 'Berhasil mengambil data movie', total: data.length, data });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = { getList };
