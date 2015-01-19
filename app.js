/**
 * The entry point for topcoder-notifier
 */
'use strict';

/**
 * Package Dependencies
 */
var config = require('config');
var express = require('express');
var example = require('./server/task/example');
var run = require('./server/task/run');

/**
 * Start Server
 */
var app = express();
var port = config.get('app.port');

app.listen(port, function() {
  console.log('Topcoder Notifier is currently run at port %s', port);
  run.registerTask(example.printTime);
  run.start();
});
