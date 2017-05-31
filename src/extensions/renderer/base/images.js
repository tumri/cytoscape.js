'use strict';

var BRp = {};

BRp.getCachedImage = function( url, crossOrigin, onLoad ){
  var r = this;
  var imageCache = r.imageCache = r.imageCache || {};
  var cache = imageCache[ url ];

  if( cache ){
    cache.image.addEventListener('error', function(){ cache.image.error = true; });
    if( !cache.image.complete ){
      cache.image.addEventListener('load', onLoad);
    }

    return cache.image;
  } else {
    cache = imageCache[ url ] = imageCache[ url ] || {};

    var image = cache.image = new Image(); // eslint-disable-line no-undef
    image.addEventListener('error', function(){ image.error = true; });
    image.addEventListener('load', onLoad);

    // #1582 safari doesn't load data uris with crossOrigin properly
    // https://bugs.webkit.org/show_bug.cgi?id=123978
    var dataUriPrefix = 'data:';
    var isDataUri = url.substring( 0, dataUriPrefix.length ).toLowerCase() === dataUriPrefix;
    if( !isDataUri ){
      image.crossOrigin = crossOrigin; // prevent tainted canvas
    }

    image.src = url;

    return image;
  }
};

module.exports = BRp;
