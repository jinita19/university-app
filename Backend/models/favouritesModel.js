import { db } from "../config/database.js";

export const favouritesModel = {
  createTable: function() {
    db.run(`CREATE TABLE IF NOT EXISTS favourites (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      university_id INTEGER,
      FOREIGN KEY (university_id) REFERENCES universities(id)
    )`);
  }
};