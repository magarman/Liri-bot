//requires
require("dotenv").config();

// Include the npm package of each (fs, request, axios)
var keys = require("./keys.js");
var fs = require("fs");
var request = require('request');
//var moment = require("moment");
//var axios = require("axios");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

//command line argument variables/options
//action represents each of the functionalities that the bot can do and will always be the third node argument. Parameters are the specifications that we are implemeting when we render the query results and will always be the fourth argument
var action = process.argv[2];
var parameter = process.argv[3];

//When the user enters either one of the commands below, go ahead and run the functions defined below (one for each action), and use the parameters that we'll define later
function switchCase() {
    switch (action) {
    //Bands in Town command
    case 'concert-this':
        bandsInTown(parameter);                   
        break;                          
    //Spotify command
    case 'spotify-this-song':
        spotSong(parameter);
        break;
    //OMDB/movie command
    case 'movie-this':
        movieInfo(parameter);
        break;
    //Do what It says command
    case 'do-what-it-says':
        getRandom();
        break;
    //default - prompts user to enter valid command
    default:                            
        logIt("Barnickles! I don't know this, please use a valid command.");
        break;
    }
};

//Now I need a function for each one of the actions

//Bands in Town function
function bandsInTown(parameter){

    if (action === 'concert-this') {
	var artist="";
	for (var i = 3; i < process.argv.length; i++) {
		artist+=process.argv[i];
	}
	console.log(artist);
    } else {
        artist = parameter;
    }
    // Querying the bandsintown api for the selected artist, the /events?app_id parameter returns the list of events including their date and time, venue name and location, ticket links, lineup, description and the link to the Bandsintown event page
    var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    request(queryUrl, function(error, response, body) {
        //200 is the response description /response code (this shows on the other api's as well)
        //if no errors and the response equals to response code 200, then
    if (!error && response.statusCode === 200) {

        
        //go to datetime property of each response, and parse the date & time to "MM/DD/YYYY" format (you can verify this on the moment documentation). Talk to me in JSON
    var JS = JSON.parse(body);
    for (i = 0; i < JS.length; i++) {
        var dTime = JS[i].datetime;
        //example 2017-03-19   T 18:00/00
        //        0123456789  10, and so on...
        var month = dTime.substring(5,7);
        var year = dTime.substring(0,4);
        var day = dTime.substring(8,10);
        var dateForm = month + "/" + day + "/" + year

        //I don't really need EVERYTHING from the response, only venue name, venue location and date
        logIt("\n---------------------------------------------------\n");
        logIt("Date: " + dateForm);
        logIt("Name: " + JS[i].venue.name);
        logIt("City: " + JS[i].venue.city);
        if (JS[i].venue.region !== "") {
        logIt("Country: " + JS[i].venue.region);
        }
        logIt("Country: " + JS[i].venue.country);
        logIt("\n---------------------------------------------------\n");
        }
    }
});
}
// Spotify function
function spotSong(parameter) {
    //create a variable that we will use to store our query, so we can then modify and render only what we need 
    var searchTrack;
    //if no parameter is given, then render the sign, which btw doesn't work.
    if (parameter === undefined) {
        searchTrack = "The Sign ace of base";
        //otherwise
    } else {
        //if the user is using the parameter (which will be the song name)
        searchTrack = parameter; 
    }
    //then query the song name
    spotify.search({
    type: 'track',
    query: searchTrack
    }, function(error, data) {
        //if there's an error, say so
        if (error) {
        logIt('Error occurred: ' + error);
        return;
        //otherwise, from the full object that you found, only render the artist name, the song name, the preview and the album name
    } else {
        logIt("\n---------------------------------------------------\n");
        logIt("Artist: " + data.tracks.items[0].artists[0].name);
        logIt("Song: " + data.tracks.items[0].name);
        logIt("Preview: " + data.tracks.items[3].preview_url);
        logIt("Album: " + data.tracks.items[0].album.name);
        logIt("\n---------------------------------------------------\n");
    }
    });
};
    //OMDB function
    function movieInfo(parameter) {

    //create the variable that we'll to execute the call
    var findMovie;
    //same as with the song, if the parameter isn't defined, make "Mr. Nobody" the default result
    if (parameter === undefined) {
        findMovie = "Mr. Nobody";
        //otherwise,
    } else {
        findMovie = parameter;
    };
    // Querying OMDB api for the title (?t), year (&y=) and short plot (&plot). 
    var queryUrl = "http://www.omdbapi.com/?t=" + findMovie + "&y=&plot=short&apikey=trilogy";

    request(queryUrl, function(err, res, body) {
        //store the result here, and make it JSON
    var bodyOf = JSON.parse(body);
    //If there's no error, and the response code is 200, then log the properties specified below
    if (!err && res.statusCode === 200) {
        logIt("\n---------------------------------------------------\n");
        logIt("Title: " + bodyOf.Title);
        logIt("Release Year: " + bodyOf.Year);
        logIt("IMDB Rating: " + bodyOf.imdbRating);
        logIt("Rotten Tomatoes Rating: " + bodyOf.Ratings[1].Value); 
        logIt("Country: " + bodyOf.Country);
        logIt("Language: " + bodyOf.Language);
        logIt("Plot: " + bodyOf.Plot);
        logIt("Actors: " + bodyOf.Actors);
        logIt("\n---------------------------------------------------\n");
        }
    });
};
//Do what it says function
// This fs. dude will read from the "random.txt" file.
// Add "utf8" to avoid stream data (garbage)
// Contents of reading will be stored in "data"
function getRandom() {
fs.readFile('random.txt', "utf8", function(error, data){
//if there are errors, say so
    if (error) {
        return logIt(error);
    }
    //otherwise, split the contents of the data Array by commas
    var dataArr = data.split(",");
    // if the very first item of the array equals to this 'action'
    if (dataArr[0] === "spotify-this-song") {
        // on the second item of the array, grab the element starting at position 1, and include everything until (but don't include) -1. then remove whitespace, and lastly, store it on this variable
        var songcheck = dataArr[1].trim().slice(1, -1);
        spotSong(songcheck);
    }   //otherwise, if the first item is this other action
        else if (dataArr[0] === "concert-this") { 
        // if the letter/character on the second position of the second item of the array equals '
        if (dataArr[1].charAt(1) === "'") {
            //store it in this variable
            var dLength = dataArr[1].length - 1;
            var data = dataArr[1].substring(2,dLength);
            console.log(data);
            bandsInTown(data);
        }
        else {
            var bandName = dataArr[1].trim();
            console.log(bandName);
            bandsInTown(bandName);
            }
    } //same as above with the song
    else if(dataArr[0] === "movie-this") {
        var movie_name = dataArr[1].trim().slice(1, -1);
        movieInfo(movie_name);
    } 
    });
};

function logIt(dataToLog) {

	console.log(dataToLog);

	fs.appendFile('log.txt', dataToLog + '\n', function(err) {
		if (err) return logIt('Error logging data to file: ' + err)	
    });
}

switchCase();