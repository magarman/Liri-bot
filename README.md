# Liri-bot

## In this assignment, we are to create a Language Interpretation and Recognition Interface (LIRI. it will be a command line node app that takes in parameters and gives back data.

LIRI will search Spotify for songs, Bands in Town for concerts, and OMDB for movies.

## Here's what each command can do:

### **node bot.js concert-this <insert band name>**
This will search the Bands in Town Artist Events API ("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp") for an artist and render the following information about each event to the terminal:
  - Date of the event (format "MM/DD/YYYY")
  - Venue name
  - Venue location
_You do not need to worry about adding dashes between words for composed (two words or more) band names_

### Preview
![Preview](images/gojira.png?raw=true "Concert-this Preview")

### **node bot.js spotify-this-song <insert song name>**
This will show the following information about the song in your terminal/bash window:
  - Artist(s)
  - Song's name
  - A preview link of the song from Spotify
  - The album that the song is from

If no song is provided, it will default to "The Sign" by Ace of Base.

### Preview
![Preview](images/would.png?raw=true "Spotify-this-song Preview")

### **node bot.js movie-this <insert movie name>**
This will output the following information to your terminal/bash window::
   * Title of the movie.
   * Year the movie came out.
   * IMDB Rating of the movie.
   * Rotten Tomatoes Rating of the movie.
   * Country where the movie was produced.
   * Language of the movie.
   * Plot of the movie.
   * Actors in the movie.

If no song is provided, it will default to "Mr. Nobody".
_Some movie names of more than 1 word may require hyphenation, for example, if you look for Pulp Fiction, the terminal will render results for Pulp. If you look up Pulp-fiction, then you will see the accurate results._

### Preview
![Preview](images/sincity.png?raw=true "movie-this Preview")

