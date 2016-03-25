var EAPMovieNotifier = require('./lib/EAPMovieNotifier');
module.exports = {
  EAP: function(options) {
    return new EAPMovieNotifier(options);
  }
};
