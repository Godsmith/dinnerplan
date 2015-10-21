'use strict';

Array.prototype.chunk = function(chunkSize) {
  var R = [];
  for (var i=0; i<this.length; i+=chunkSize)
    R.push(this.slice(i,i+chunkSize));
  return R;
};
String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

