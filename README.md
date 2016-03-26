# movie-notifier-lk

A simple module to notifier you when your favourite movie is being played at most Sri Lankan cinemas.

## Installation

Download node at [nodejs.org](http://nodejs.org) and install it, if you haven't already.

```sh
npm install movie-notifier-lk --save
```
## Usage

### EAP Movies

```js
var MovieNotifier = require('movie-notifier-lk');

var notifier = MovieNotifier.EAP({
  interval: 2000,
  search: 'Batman vs. Superman'
});

notifier.on('found', function(){
  console.log('Movie is being played at EAP cinemas.')
});
```

### Ceylon Theaters
Not implemented yet.


## Tests
No tests yet.

## Dependencies

- [autocorrect](https://github.com/yefim/autocorrect): Find the best matching word using the first smallest Levenshtein distance
- [debug](https://github.com/visionmedia/debug): small debugging utility
- [striptags](https://github.com/ericnorris/striptags): PHP strip_tags in Node.js
- [superagent](https://github.com/visionmedia/superagent): elegant &amp; feature rich browser / node HTTP with a fluent API

## Dev Dependencies


None

## License

ISC
