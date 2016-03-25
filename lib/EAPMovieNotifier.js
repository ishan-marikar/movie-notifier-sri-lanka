var superagent = require('superagent');
var striptags = require('striptags');
var util = require('util');
var debug = require('debug')('movie-notifier');
var EventEmitter = require('events').EventEmitter;

var THEATER = "http://eapmovies.com/component/eapmovies/index.php";

function EAPMovieNotifier(options) {
  this.options = options;
  this.iterator = null;
  EventEmitter.call(this);
}

util.inherits(EAPMovieNotifier, EventEmitter);

function create(options) {
  return new EAPMovieNotifier(options);
}


EAPMovieNotifier.prototype.listen = function() {
  var that = this;
  this.iterator = setInterval(function() {
    getMovies(function(error, movies) {
      if (error) throw error;
      var autocorrect = require('autocorrect')({
        words: movies
      });
      var searchQuery = that.options.search.toLowerCase();
      var correctedWord = autocorrect(searchQuery);
      debug('Autocorrecting ' + searchQuery + ' to ' + correctedWord );
      movies.forEach(function(movie) {
        if ( new RegExp(correctedWord).test(movie) ) {
          debug('Found ' + movie);
          that.emit('found');
          that.stop();
        }
      });
    });
  }, that.options.interval);
};

EAPMovieNotifier.prototype.stop = function() {
  debug('Stopping the listener.');
  clearInterval(this.iterator);
};

EAPMovieNotifier.prototype.getMovies = function(callback) {
  return getMovies(callback);
};


var getMovies = function(callback) {
  debug('Retrieving movies');
  superagent.post(THEATER)
    .type('form')
    .send({
      "controller": "buyticket",
      "format": "raw",
      "option": "com_eapmovies",
      "task": "movielist",
      "tid": "3"
    }).end(function(error, response) {
      if (error) return callback(error, null);
      if (response.status !== 200) return callback(new Error('Status code not 200'), null);
      var movies = striptags(response.text)
        .trim()
        .toLowerCase()
        .split('\n');
      movies.shift();
      callback(null, movies);
    });
};

module.exports = EAPMovieNotifier;
module.exports.create = EAPMovieNotifier;
