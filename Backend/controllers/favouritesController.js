import { db } from "../config/database.js";

export const addFavourite = (req, res) => {
  db.run(
    "INSERT INTO favourites (university_id) VALUES (?)",
    [req.params.uniId],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID });
    }
  );
};

export const getFavourites = (req, res) => {
  db.all(
    `SELECT u.* FROM favourites f JOIN universities u ON f.university_id = u.id`,
    [],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      rows.forEach((row) => {
        row.domains = JSON.parse(row.domains);
        row.web_pages = JSON.parse(row.web_pages);
        row.is_favourite = true
      });
      res.json(rows);
    }
  );
};

export const deleteFavourite = (req, res) => {
  db.run(
    "DELETE FROM favourites WHERE university_id = ?",
    [req.params.uniId],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ deleted: this.changes });
    }
  );
};
