import fs from "fs";
import { db } from "./config/database.js";
import { universityModel } from "./models/universityModel.js";
import { countryModel } from "./models/countryModel.js";
import { favouritesModel } from "./models/favouritesModel.js";

// Load universities from JSON
const universities = JSON.parse(fs.readFileSync("universities.json"));

db.serialize(() => {
  //create tables
  universityModel.createTable();
  countryModel.createTable();
  favouritesModel.createTable();

  //Insert countries
  const countriesSet = new Set(universities.map((u) => u.country));
  countriesSet.forEach((country) => countryModel.insert(country));

  //Insert universities
  universities.forEach((u) => universityModel.insert(u));
});

db.close();
