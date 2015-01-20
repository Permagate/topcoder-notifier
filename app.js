/**
 * The entry point for topcoder-notifier
 */
'use strict';

/**
 * Package Dependencies
 */
var config = require('config');
var express = require('express');
var run = require('./server/task/run');
var tcApi = require('./server/task/tc-api.js');
var mail = require('./server/task/mail');

/**
 * Start Server
 */
var app = express();
var port = config.get('app.port');

app.listen(port, function() {
  console.log('Topcoder Notifier is currently run at port %s', port);
  run.registerTask(tcApi.searchOpenSoftwareChallengesTask({
    pageIndex: 1,
    pageSize: 10,
    type: 'develop',
    technologies: 'Node.js,Angular.js',
    sortColumn: 'challengeId',
    sortOrder: 'desc'
  }));
  run.registerTask(mail.sendEmail('kend654@gmail.com', 'Node.JS Test Mailgun', 'Nodemailer works!'));
  run.start();
});
