import { db } from "../config/database.js";

export const universityModel = {
  createTable: function() {
    db.run(`CREATE TABLE IF NOT EXISTS universities (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      alpha_two_code TEXT,
      country TEXT,
      state_province TEXT,
      name TEXT,
      domains TEXT,
      web_pages TEXT
    )`);
  },
  insert: function(u) {
    db.run(`INSERT INTO universities (alpha_two_code, country, state_province, name, domains, web_pages) VALUES (?, ?, ?, ?, ?, ?)`,
      [u.alpha_two_code, u.country, u["state-province"], u.name, JSON.stringify(u.domains), JSON.stringify(u.web_pages)]);
  }
};