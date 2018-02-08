require("dotenv").config();

var request = require("request");
var keys = require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var fs = require('fs');

var nodeArgs = process.argv;

// ==========================Twitter Functionality=========================

var client = new Twitter(keys.twitter);

function myTweets() {

//the following parameters are to grab tweets from Roosterteeth, not from my own twitter, as i dont have one.
var twitParams = {
    user_id: '14903310',
    screen_name: 'RoosterTeeth',
    count: '20',
    include_rts: false,
};

client.get('statuses/user_timeline', twitParams, function(error, tweets, response) {
    if (!error) {
      JSON.stringify(tweets, null, 4)
        tweets.forEach(function(tweet) {
            console.log(tweet.text);
            console.log("====================RoosterTeeth Tweet===================");
          });
        }
      });
  };

if (nodeArgs[2] == 'my-tweets') {
  myTweets();
};

// ==========================Spotify Functionality==========================

var spotify = new Spotify(keys.spotify);

function spotifyThis() {

var trackName = "";

//here we create a for loop to take care of spaces between words
  for (var i = 3; i < nodeArgs.length; i++) {
        if (i > 3 && i < nodeArgs.length) {
          trackName = trackName + "+" + nodeArgs[i];
        }
        else {
          trackName += nodeArgs[i];
        }
    }

//here I state that if no song was given, trackName must default to "The Sign".
    if (nodeArgs[3] == undefined) {
      trackName = "The+Sign";
    }

//spotify query parameters. why does the function only work if this variable is right next to the .search?
var spotParams = {
      query: trackName,
      type: 'track,artist,album',
      limit: '10'
}
spotify.search(spotParams, function(err, data) {

    var tracks = data.tracks.items;

        if (err) {
           return console.log('Error occurred: ' + err);
         }
          console.log("============================Spotify Song Info================================");

    //tried implementing the .forEach method as depicted up above, but node would not recognize .forEach as a function.
          for (var j = 0; j < tracks.length; j++){

                console.log("Song Name: " + JSON.stringify(data.tracks.items[j].name));
                console.log("Artist: " + JSON.stringify(data.tracks.items[j].artists[0].name, null, 2));
                console.log("Album: " + JSON.stringify(data.tracks.items[j].album.name, null, 2));

    //if preview_url is null, apologize. you terrible api.
              if (data.tracks.items[j].preview_url === null)  {
                console.log("Preview Link: We are sorry, this is currently unavailable.");
              } else {
                console.log("Preview Link: " + JSON.stringify(data.tracks.items[j].preview_url));
              }
                console.log("------------------------------");
                console.log("------------------------------");
                }
            });
        };

if (nodeArgs[2] == 'spotify-this-song') {
    spotifyThis();
  };

// ==========================Movie Functionality==========================
//unfortunately i was unable to get to this. if i had more time i would look back at the omdb activity we previously completed in class and see about how to implement functionality that way.
