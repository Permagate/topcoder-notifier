/**
 * This is just an example task.
 */
'use strict';

var example = {};

/**
 * Print the current time.
 */
example.printTime = function(callback) {
  var date = new Date();
  callback(null, date);
};

module.exports = example;
