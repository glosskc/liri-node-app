console.log('this is loaded');

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};
 

require("dotenv").config();
var moment = require("moment");
// var spotify = new Spotify(keys.spotify);
var fs = require("fs");
var axios = require("axios");

// Create the TV constructor
var Liri = function() {
    // var search =  process.argv[2];
    // var term = process.argv.slice(3).join(" ");
      // divider will be used as a spacer between the tv data we print in log.txt
      var divider = "\n------------------------------------------------------------\n\n";
    
      // findShow takes in the name of a tv show and searches the tvmaze API
      this.movieThis = function(movie) {
        const URL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
    
        axios.get(URL).then(function(response) {
          // Place the response.data into a variable, jsonData.
          var jsonData = response.data;
    
          // showData ends up being the string containing the show data we will print to the console
          var movieData = [
            "Movie Title: " + jsonData.Title,
            "Release Year: " + jsonData.Year,
            "IMDB Rating: " + jsonData.Ratings[0].Value,
            "Country: " + jsonData.Country,
            "Language: " + jsonData.Language,
            "Plot: " + jsonData.Plot,
            "Actors: " + jsonData.Actors
          ].join("\n\n");
    
          // Append showData and the divider to log.txt, print showData to the console
          fs.appendFile("random.txt", movieData + divider, function(err) {
            if (err) throw err;
            console.log(movieData);
          });
        });
      };
    
      this.concertThis = function(artist) {
        const URL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
        axios.get(URL).then(function(response){
    
          var jsonData= response.data[0];
    
          var artistData = [
            "Artist: " + artist,
            "Venue Name: " + jsonData.venue.name,
            "Venue Location: " + jsonData.venue.city + ", " + jsonData.venue.region,
            "Date of Event: " + moment(jsonData.datetime).format('l'),
          ].join("\n\n");
    
          fs.appendFile("log.txt", artistData + divider, function(err){
            if(err)throw err;
            console.log(artistData);
          });
        });
      
    
        // Add code to search the TVMaze API for the given actor
        // The API will return an array containing multiple actors, just grab the first result
        // Append the actor's name, birthday, gender, country, and URL to the `log.txt` file
        // Print this information to the console
      };
    };
   
    
    // Grab search command line argument
    
    module.exports = Liri;
    