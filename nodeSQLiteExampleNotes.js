// select all the rows from a table from Flower. In the callback, check if the petal_color is ‘blue’ and console.log the row if it is.
const db = require("./db");
db.each("SELECT * FROM Flower", (err, row) => {
  if (row.petal_color === "blue") {
    console.log(row);
  }
});

//
// create empty table
const db = require("./db");
db.run("CREATE TABLE City ()");

//
// SELECT the superpower column of the superhero in the Superhero table with an id of 12
const db = require("./db");
db.get("SELECT superpower FROM Superhero WHERE id=12", (err, row) => {
  console.log(row.superpower);
});

//
// Log the error to the console if it exists, otherwise log the retrieved rows.
const db = require("./db");
db.all("SELECT * from NonexistentTable", (err, rows) => {
  if (err) {
    console.log(err);
  } else {
    console.log(rows);
  }
});

//
// Use db.each() to find the totalPrice if you bought every shirt from the Clothing database.
// Select the price from each row where item is 'shirt' and add the prices to totalPrice
const db = require("./db");
let totalPrice = 0;
db.each(
  "SELECT price FROM Clothing WHERE item='shirt'",
  (err, row) => {
    totalPrice += Number(row.price);
  },
  (err, numRows) => {
    console.log(totalPrice);
  }
);

//
// Find and print the quantity column of the spice 'paprika' in a table called SpiceRack based on its name.
// names are unique, so you only need to retrieve one row.
const db = require("./db");
db.get("SELECT quantity FROM SpiceRack WHERE name='paprika'", (err, row) => {
  console.log(row.quantity);
});

//
// Placeholder aka Variable/Parameter example
const db = require("./db");
const selectByGenre = genre => {
  db.all("SELECT title FROM Song WHERE genre=$genre", { $genre: genre });
};

//
// db.all() to find every scientist from the Scientist table whose field is 'biology' and select all columns.
const db = require("./db");
db.all("SELECT * FROM Scientist WHERE field='biology'", (err, rows) => {
  console.log(rows);
});

//
// db.each() to print the height of every character from the CartoonCharacter database where the species is 'mouse'
// eats up less resources then forEach
const db = require("./db");
db.each("SELECT * FROM CartoonCharacter WHERE species='mouse'", (err, row) => {
  console.log(row.height);
});

//
// Drop table if it exists otherwise create it
const db = require("./db");
db.serialize(() => {
  db.run("DROP TABLE IF EXISTS Furniture", error => {
    if (error) {
      throw error;
    }
  });
  db.run("CREATE TABLE Furniture ()");
});

//
//  function called logCaffeineLevel that takes the name of a tea and logs its caffeine_level from the Tea table
const db = require("./db");
const logCaffeineLevel = name => {
  db.get("SELECT * FROM Tea WHERE name=$name;", { $name: name }, (err, row) => {
    console.log(row.caffeine_level);
  });
};

//
// Insert a new bridge into the Bridge table, with the name Brooklyn Bridge and with an established_year value of 1883
const db = require("./db");
db.run(
  "INSERT INTO Bridge (name, established_year) VALUES ('Brooklyn Bridge', 1883);"
);

//
// Get the traffic property from the TrainStation table where the station_id is 38 and the month is May
const db = require("./db");
db.get(
  "SELECT traffic FROM TrainStation WHERE station_id=38 AND month='May'",
  (err, row) => {
    console.log(row.traffic);
  }
);

//
// find the number_of_floors column from the Building table at the user-given address
const db = require("./db");
const logFloorsForAddress = address => {
  db.get(
    "SELECT number_of_floors FROM Building WHERE address=$address",
    { $address: address },
    (err, row) => {
      console.log(row.number_of_floors);
    }
  );
};

//
// Add a row to the BirdOfParadise table with scientific_name Cicinnurus regius and with king bird-of-paradise as its common_name
const db = require("./db");
db.run(
  "INSERT INTO BirdOfParadise (scientific_name, common_name) VALUES ('Cicinnurus regius', 'king bird-of-paradise');"
);

//
// inserts a movie into the Movie table with columns named title, publication_year, and director
const db = require("./db");
const addMovie = (title, publicationYear, director) => {
  db.run(
    "INSERT INTO Movie (title, publication_year, director) VALUES ($title, $pubYear, $director)",
    {
      $title: title,
      $pubYear: publicationYear,
      $director: director
    }
  );
};

//
// db.each() to list all of the beverage names that have 'soda' as their type from the Minifridge table
const db = require("./db");
db.each("SELECT * FROM Minifridge WHERE type='soda'", (err, row) => {
  console.log(row.name);
});

//
// Add a new holiday to the Holiday database. Set the name attribute to any name you like and set work to false
const db = require("./db");
db.run(
  "INSERT INTO Holiday (name, work) VALUES ('Feast of Christ The King', false);"
);
