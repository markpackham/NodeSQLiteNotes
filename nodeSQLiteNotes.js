// Connect to database & open up the database
const { printQueryResults } = require("./utils");
// require the 'sqlite3' package here
const sqlite3 = require("sqlite3");
// open up the SQLite database in './db.sqlite'
const db = new sqlite3.Database("./db.sqlite");
db.all("SELECT * FROM TemperatureData ORDER BY year", (error, rows) => {
  if (error) {
    throw error;
  }
  printQueryResults(rows);
});

// Selection Query
const { printQueryResults } = require("./utils");
const sqlite = require("sqlite3");
const db = new sqlite.Database("./db.sqlite");
db.all("SELECT * FROM TemperatureData WHERE year = 1970", (error, rows) => {
  printQueryResults(rows);
});

// Select single row via db.get
const { printQueryResults } = require("./utils");
const sqlite = require("sqlite3");
const db = new sqlite.Database("./db.sqlite");
db.get("SELECT * FROM TemperatureData WHERE year = 1990", (error, row) => {
  printQueryResults(row);
});
