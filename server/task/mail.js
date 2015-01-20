/**
 * This is a collection of tasks that are related with emailing stuffs.
 */
'use strict';

/**
 * Package Dependencies
 */
var config = require('config');
var nodemailer = require('nodemailer');
var mailgunTrans = require('nodemailer-mailgun-transport');

var _fromMail = config.get('mailgun.from');
var _auth = {
  auth: {
    api_key: config.get('mailgun.key'),
    domain: 'sandbox5f505afef1344b0d92e1854f37306895.mailgun.org'
  }
};
var _nodemailerMailgun = nodemailer.createTransport(mailgunTrans(_auth));
var mail = {};

/**
 * Send Email.
 */
mail.sendEmail = function(to, subject, text) {
  console.log(_fromMail);
  console.log(to);
  console.log(subject);
  console.log(text);
  return function(callback) {
    _nodemailerMailgun.sendMail({
      from: _fromMail,
      to: to,
      subject: subject,
      text: text
    }, function(err, info) {
      if (err) {
        callback(null, err);
      } else {
        callback(null, info);
      }
    });
  };
};

module.exports = mail;
