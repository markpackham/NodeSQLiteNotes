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

// Placeholders
/*
When we write a JavaScript function, we give the function parameters that will have many 
different values when the function gets called. Placeholders solve a similar problem 
in the world of SQL queries
*/
const { printQueryResults } = require("./utils");
const sqlite = require("sqlite3");
const db = new sqlite.Database("./db.sqlite");
const ids = [1, 25, 45, 100, 360, 382];
ids.forEach(id => {
  db.get(
    //use placeholders to match the id as you iterate
    "SELECT * FROM TemperatureData WHERE id = $id",
    {
      $id: id
    },
    (error, rows) => {
      printQueryResults(rows);
    }
  );
});

//
// Insert & Check Errors example
const { printQueryResults } = require("./utils");
const sqlite = require("sqlite3");
const db = new sqlite.Database("./db.sqlite");
const newRow = {
  location: "Istanbul, Turkey",
  year: 1976,
  tempAvg: 13.35
};
//Example inserting data
db.run(
  "INSERT INTO TemperatureData (location, year, temp_avg) VALUES ($location, $year, $tempAvg)",
  {
    $location: newRow.location,
    $year: newRow.year,
    $tempAvg: newRow.tempAvg
  },
  function(error) {
    // handle errors here!
    if (error) {
      return console.log(error);
    }
    console.log(this.lastID);
    db.get(
      "SELECT * FROM TemperatureData WHERE id = $id",
      {
        $id: this.lastID
      },
      function(error, row) {
        printQueryResults(row);
      }
    );
  }
);

// .forEach() that allows us to process every element in an array separately.
// .each() process every row returned from a database query.
// db.each() takes a query and a callback function that it performs on each row returned from the query. This is a useful technique for transforming or updating rows.
// This is also useful for memory management — we only have to look at one row at a time instead of trying to process every returned row at the same time
const {
  printQueryResults,
  calculateAverages,
  addClimateRowToObject
} = require("./utils");
const sqlite = require("sqlite3");
const db = new sqlite.Database("./db.sqlite");
const temperaturesByYear = {};
db.run("DROP TABLE IF EXISTS Average", error => {
  if (error) {
    throw error;
  }
  //.each() used for rows
  db.each(
    "SELECT * FROM TemperatureData",
    (error, row) => {
      if (error) {
        throw error;
      }
      addClimateRowToObject(row, temperaturesByYear);
    },
    error => {
      if (error) {
        throw error;
      }
      const averageTemperatureByYear = calculateAverages(temperaturesByYear);
      printQueryResults(averageTemperatureByYear);
    }
  );
});


// Database tasks run in parallel which makes them fast but sometimes you need to do stuff in order
// Ugly nested method { } to do things in order
db.run("DROP TABLE Dog", error => {
  db.run("CREATE TABLE Dog", error => {
    db.run("INSERT INTO Dog (breed, name, owner, fur_color, fur_length) VALUES ('Dachschund', 'Spike', 'Elizabeth', 'Brown', 'Short')", error => {
    }
  }
}
//
// Neater method with serialize
db.serialize(() => {                                                                                                                          
  db.run("DROP TABLE Dog");
  db.run("CREATE TABLE Dog");
  db.run("INSERT INTO Dog (breed, name, owner, fur_color, fur_length) VALUES  ('Dachshund', 'Spike', 'Elizabeth', 'Brown', 'Short')");
});



//
// Make sure a table doesn't already exist then Create Table
// db.serialize() run things in specific order rather than having to nest stuff
const {
  calculateAverages,
  addClimateRowToObject,
  logNodeError,
  printQueryResults
} = require("./utils");
const sqlite = require("sqlite3");
const db = new sqlite.Database("./db.sqlite");
const temperaturesByYear = {};
// Thanks to serialize we run the first thing first, then move onto the next, then the next
db.serialize(() => {
  db.run("DROP TABLE IF EXISTS Average", error => {
    if (error) {
      throw error;
    }
  });
  db.run(
    "CREATE TABLE Average (id INTEGER PRIMARY KEY, year INTEGER NOT NULL, temperature REAL NOT NULL)",
    logNodeError
  );
  db.each(
    "SELECT * FROM TemperatureData",
    (error, row) => {
      if (error) {
        throw error;
      }
      addClimateRowToObject(row, temperaturesByYear);
    },
    error => {
      if (error) {
        throw error;
      }
      const averageTemperatureByYear = calculateAverages(temperaturesByYear);
      averageTemperatureByYear.forEach(row => {
        db.run(
          "INSERT INTO Average (year, temperature) VALUES ($year, $temp)",
          {
            $year: row.year,
            $temp: row.temperature
          },
          err => {
            if (err) {
              console.log(err);
            }
          }
        );
      });
      db.all("SELECT * FROM Average", (error, row) => {
        printQueryResults(row);
      });
    }
  );
});


//
// select all the rows from a table from Flower. In the callback, check if the petal_color is ‘blue’ and console.log the row if it is.
const db = require('./db');
db.each("SELECT * FROM Flower", (err, row) => {
  if (row.petal_color === "blue") {
    console.log(row);
  }
});

//
// create empty table
const db = require('./db');
 db.run(
    "CREATE TABLE City ()"
  );


//
// SELECT the superpower column of the superhero in the Superhero table with an id of 12
const db = require('./db');
db.get("SELECT superpower FROM Superhero WHERE id=12", (err, row) => {
  console.log(row.superpower);
});