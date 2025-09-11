import { db } from "../config/database.js";

export const countryModel = {
  createTable: function() {
    db.run(`CREATE TABLE IF NOT EXISTS countries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE
    )`, (err) => {
        if(err) console.log('Error while creating a table countries')
        console.log('Craeted table countries')
    });
  },
  insert: function(name) {
    db.run('INSERT OR IGNORE INTO countries (name) VALUES (?)', [name], (err) => {
        if(err) console.log('Error while insertimg into a table countries')
        console.log('Inserted data into table countries')
    });
  }
};