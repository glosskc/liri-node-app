var Liri = require("./key.js");

var liri = new Liri();

var search = process.argv[2];
// Joining the remaining arguments since an actor or tv show name may contain spaces
var term = process.argv.slice(3).join(" ");

// By default, if no search type is provided, search for a tv show
if (!search) {
  search = "movie";
}

// By default, if no search term is provided, search for "Andy Griffith"
if (!term) {
  term = "the Matrix";
}

// Print whether searching for a show or actor, print the term as well
if (search === "Movie-this") {
  console.log("Searching for Movie");
  liri.movieThis(term);
};

if (search === "Concert-this") {
    console.log("Searching for Artist");
    liri.concertThis(term);
  };




