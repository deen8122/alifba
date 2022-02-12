'use strict';

const EOL = require('os').EOL;
const util = require('xutil');
const childProcess = require('child_process');

const _ = util.merge({}, util);

_.exec = function(cmd, opts) {
  return new Promise((resolve, reject) => {
    childProcess.exec(cmd, _.merge({
      maxBuffer: 1024 * 512,
      wrapArgs: false
    }, opts || {}), (err, stdout) => {
      if (err) {
        return reject(err);
      }
      resolve(stdout.trim());
    });
  });
};

module.exports = _;
