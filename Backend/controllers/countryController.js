import { db } from "../config/database.js";

export const getCountries = (req, res) => {
  db.all('SELECT name FROM countries ORDER BY name', [], (err, rows) => {
    console.log('res', rows);
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows.map(r => r.name));
  });
};