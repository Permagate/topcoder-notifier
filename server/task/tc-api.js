/**
 * This is a collection of tasks that are related to Topcoder API, one way or another.
 */
'use strict';

/**
 * Package Dependencies
 */
var config = require('config');
var querystring = require('querystring');
var request = require('request');

var _tcApiUrl = config.get('tc.url');
var _tcApiMem = [];
var _memIndex = -1;
var tcApi = {};

function _generateMemIndex() {
  _memIndex++;
  console.log('Task number %s generated', _memIndex);
  return _memIndex;
}

/**
 * Make a task that searches open software challenges.
 * Topcoder endpoint: Search Open Software Challenges.
 * @param {Object} params endpoint query parameters. Check the official doc for explanation.
 * @returns {Function} A task to be registered in the task runner.
 */
var _searchOpenSoftwareChallengesPath = '/v2/challenges/open';
tcApi.searchOpenSoftwareChallengesTask = function(params) {
  var qs = querystring.stringify(params);
  var url = _tcApiUrl + _searchOpenSoftwareChallengesPath;
  if (qs) {
    url += '?' + qs;
  }
  var memIndex = _generateMemIndex();
  
  return function(callback) {
    request(url, function (err, response, body) {
      body = JSON.parse(body);
      if (err) {
        callback(null, err);
        return;
      }
      if (_tcApiMem[memIndex]) {
        var responseIndex = 0;
        var latestChallenges = [];
        console.log('haha');
        while (_tcApiMem[memIndex].challengeId !== body.data[responseIndex].challengeId) {
          latestChallenges.push(body.data[responseIndex]);
          responseIndex++;
        }
        for (var i = latestChallenges.length; i--; i >= 0) {
          _tcApiMem[memIndex] = latestChallenges[latestChallenges.length - 1];
          console.log('New challenge appears: %s', latestChallenges[i].challengeName);
        }
      } else {
        _tcApiMem[memIndex] = body.data[0];
        console.log('Latest challenge: %s', _tcApiMem[memIndex].challengeName);
      }
      callback(null, '');
      return;
    });
  };
};

module.exports = tcApi;
