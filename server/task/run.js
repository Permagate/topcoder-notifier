/**
 * The little code that will run all registered tasks in parallel every other time.
 * In this module, task is pretty much equivalent with a function with a callback parameter that can be run "as-is".
 * A task should be structured as follow:
 *
 *   function(callback) {
 *     // Do your things here
 *     // .....
 *
 *     // Don't call this plz
 *     callback(err, null)
 *
 *     // Always call this when the task is done. 
 *     // The second parameter should be true if the task runs successfully. Otherwise, it's false.
 *     // The third parameter should be what you want to print in the console.
 *     callback(null, 'Random task is successful')
 *   }
 *
 */
'use strict';

/**
 * Package Dependencies
 */
var async = require('async');
var config = require('config');
var _ = require('lodash');

/**
 * All functions run periodically every other time. It starts empty.
 * @type Array
 */
var _registeredTasks = [];

/**
 * The period of delay between each task collective run. It's in milliseconds.
 * @type Number
 */
var _period = config.get('run.period');

/**
 * Run all registered tasks in parallel.
 */
function _runRegisteredTasks() {
  async.parallel(_registeredTasks, function(err, results) {
    if (err) {
      return;
    }
    _.forEach(results, function(result) {
      console.log(result);
    });
  });
}

/**
 * Exported properties.
 * @type Object
 */
var run = {};

/**
 * Register a task.
 * @param {Function} task The registered task.
 */
run.registerTask = function(task) {
  _registeredTasks.push(task);
};

/**
 * Start running tasks periodically.
 */
run.start = function() {
  setTimeout(function() {
    _runRegisteredTasks();
    run.start();
  }, _period);
};

module.exports = run;
