var MovieNotifier = require('../');

var notifier = MovieNotifier.EAP({
  interval: 2000,
  search: 'Batman vs. Superman'
});

notifier.listen();

notifier.on('found', function() {
  console.log('FOUND!!');
});
