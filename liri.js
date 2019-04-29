var Liri = require("./key.js");


var liri = new Liri();

var search = process.argv[2];
// Joining the remaining arguments since an move or concert name may contain spaces
var term = process.argv.slice(3).join(" ");

// By default, if no search type is provided, search for a movie show
if (!search) {
  search = "movie";
}

// By default, if no search term is provided, search for "the Matrix"
if (!term) {
  term = "the Matrix";
}


if (search === "Movie-this") {
  console.log("Searching for Movie");
  liri.movieThis(term);
};

if (search === "Concert-this") {
    console.log("Searching for Artist");
    liri.concertThis(term);
  };

  if (search === "Spotify-this") {
    console.log("Searching for Song:");
    liri.spotifyThis(term);
  };
//   } else {
//     songTitle = 'The Sign Ace of Base'
//     console.log('No song is provided. The program will default to "The Sign" by Ace of Base.');
//   }




