import { db } from "../config/database.js";

export const getUniversities = (req, res) => {
  const { country, name } = req.query;

  const sql = `
    SELECT 
      u.*, 
      CASE WHEN f.university_id IS NOT NULL THEN 1 ELSE 0 END AS is_favourite
    FROM universities u
    LEFT JOIN favourites f ON u.id = f.university_id
    WHERE 
      (? IS NULL OR u.country = ?)
      AND (? IS NULL OR u.name LIKE '%' || ? || '%')
  `;

  db.all(sql, [country, country, name, name], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });

    rows.forEach((row) => {
      row.domains = JSON.parse(row.domains);
      row.web_pages = JSON.parse(row.web_pages);
      row.is_favourite = Boolean(row.is_favourite); // convert 0/1 → true/false
    });
    res.json(rows);
  });
};
