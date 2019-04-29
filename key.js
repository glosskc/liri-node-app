
require("dotenv").config();
var moment = require("moment");
var keys = require("./keys.js")
// var spotify = new Spotify(keys.spotify);
var fs = require("fs");
var axios = require("axios");
const Spotify = require('node-spotify-api');
const spotify = new Spotify(keys.spotify);

// Create the TV constructor
var Liri = function() {
   
      // divider will be used as a spacer between the tv data we print in log.txt
      var divider = "\n------------------------------------------------------------\n\n";
    
      // findShow takes in the name of a movie and searches the omdb API
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



        this.spotifyThis = function(searchSong){
            spotify.search({ type: 'track', query: searchSong }, function (error, data) {
                const URL = "https://api.spotify.com/v1/albums/{id}/tracks";
        axios.get(URL).then(function(response){
    

               
            
                  // Build formatted 'songResult' to display
                  var songResult = [
                    "Artist(s): " + song.artists[0].name,
                    "Song's name: " + song.name,
                    "A preview link of this song form Spotify: " + song.preview_url,
                    "Album: " + song.album.name + " (Released date: " + song.album.release_date,
                  ].join("\n\n");

        
                  // Output the formatted information to the user's terminal/bash window
                  /* console.log(songResult); */
            
                  // Output the formatted data to log.txt
                  fs.appendFile("Log.txt", songResult + divider, function(err){
                      if(err)throw err;
                      console.log(songResult)
                  });
                  
            
                  console.log(response);
               
                });
            });
        };
      };
    };
    
    
    // Grab search command line argument
    
    module.exports = Liri;
    