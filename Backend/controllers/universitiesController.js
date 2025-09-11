import { db } from "../config/database.js";

export const getUniversities = (req, res) => {
  const { country, name } = req.query;
  const sql = `SELECT * FROM universities WHERE 
    (? IS NULL OR country = ?) 
    AND (? IS NULL OR name LIKE '%' || ? || '%')`;
  db.all(sql, [country, country, name, name], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    rows.forEach((row) => {
      row.domains = JSON.parse(row.domains);
      row.web_pages = JSON.parse(row.web_pages);
    });
    res.json(rows);
  });
};
