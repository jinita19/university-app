import sqlite3 from "sqlite3";

function connectCb(err) {
  if (err) {
    console.log(err.message);
    return;
  }
  console.log("Connected to SQLite DB");
}

const sql3 = sqlite3.verbose();
export const db = new sql3.Database('./universities.db', connectCb);
