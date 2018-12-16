require("dotenv").config();

// Setup Variables.

var fs = require("fs");
var keys = require("./keys.js");
var axios = require("axios");
var omdb = require("omdb");
var request = require("request");
var Spotify = require("node-spotify-api");
var moment = require("moment");
/// var spotify = new Spotify(keys.spotify);

//This is switch/case logic used to initate application selections in NODE.JS
function switchCase (comMandCap,entryVar){
  console.log(comMandCap,entryVar)
   switch(comMandCap) {
     case "concert-this":
      bandinTown(entryVar);
      break;
     case "spotify-this-song":
      spotifyProc(entryVar);
      break;
     case "movie-this":
      movieProc(entryVar);
      break;
     case "do-what-it-says" :
      randomInfo();
      break; 
    default:
      console.log("function not supported");
     
  }
  
};
//This Javascript function finds those bands or perfromers in concert.
function bandinTown(entryVar){

  axios.get("https://rest.bandsintown.com/artists/" + entryVar + "/events?app_id=codingbootcamp")
  .then(function(response){
    //console.log(response.data); // ex.: { user: 'Your User'}
    //console.log(response.status); // ex.: 200
    var bName=response.data;

    for(var i=0; i<bName.length; i++){

      console.log("\n-----------------------------------------\n");
      console.log("Venue: " +bName[i].venue.name);
      console.log("Country: " + bName[i].venue.country);
      console.log("City: " + bName[i].venue.city);
      console.log("Artist: " + entryVar);
      console.log("\n------------------------------------------\n");
      var entryVAR = "";
      
    }
    
  }); 
  //.catch(function(error){console.log(error)});
}

//This Javascript accesses Spotify.  
function spotifyProc(entryVar) {
  var spotify = new Spotify(keys.spotify);
  //console.log("Spotify!");
    
    if (!entryVar) {
      entryVar = "The Sign Ace of Base";
    }
      //console.log(entryVar);
      spotify.search({
      type: 'track',
      query: entryVar
    }, function(error, data) {
      if (error) {
        console.log('Error occurred: ' + error);
        var entryVAR = "";
        return;
      } 
      //console.log(data.tracks.items);
        console.log("\n---------------------------------------------------\n");
        console.log("Artist: " + data.tracks.items[0].artists[0].name);
        console.log("Song: " + data.tracks.items[0].name);
        console.log("Preview: " + data.tracks.items[0].preview_url);
        console.log("Album: " + data.tracks.items[0].album.name);
        console.log("\n---------------------------------------------------\n");
        var entryVAR = "";
       
      
    });
      
    
   
   }
  
  //This Javascript fuction pulls movie information from OMDBI
  function movieProc(entryVar) {
    
    if (!entryVar) {
      entryVar = "Mr. Nobody";
    } 
      
    axios.get("http://www.omdbapi.com/?t=" + entryVar + "&y=&plot=short&apikey=trilogy" )
    .then(function(response){

      
          
         // console.log(response)
          
        console.log("\n---------------------------------------------------\n");
        console.log("Title: " + response.data.Title);
        console.log("Release Year: " + response.data.Year);
        console.log("IMDB Rating: " + response.data.imdbRating);
        console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value); 
        console.log("Country: " + response.data.Country);
        console.log("Language: " + response.data.Language);
        console.log("Plot: " + response.data.Plot);
        console.log("Actors: " + response.data.Actors);
        console.log("\n---------------------------------------------------\n");
        var entryVAR = "";
               
      
      
        
      
    })
    .catch(function(error){console.log(error)});
  };

  function randomInfo() {
    fs.readFile('random.txt', "utf8", function(error, data){
    
        if (error) {
            console.log("There is a Problem")
            //return troubleCatcher(error);
          }
          
       var arrayData = data.split(",");
        if (arrayData.length === 2) {
          switchCase(arrayData[0], arrayData[1]);
        } else if (arrayData.length === 1) {
          switchCase(arrayData[0]);
        }
       
      
       
        });
    
    }
  
 	
 var runCommand = function(argOne, argTwo) {
  switchCase(argOne, argTwo);
  };    
  runCommand(process.argv[2], process.argv.slice(3).join(" "));  
    
       
     