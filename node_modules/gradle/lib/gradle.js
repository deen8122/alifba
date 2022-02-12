'use strict';

var fs = require('fs');
var path = require('path');
var spawn = require('win-spawn');

const _ = require('./helper');

const checkEnv = options => {
  return new Promise((resolve, reject) => {

    if (_.platform.isWindows) {

      if (process.env.GRADLE_HOME) {
        options.gradle = 'gradle';
        resolve(options);
      } else {
        console.log('please set GRADLE_HOME');
        resolve();
      }
    } else {
      _.exec(`which gradle`).then(gradle => {
        options.gradle = gradle;
        resolve(options);
      });
    }
  });
};

const gradleBuild = options => {
  return new Promise((resolve, reject) => {
    var cwd = path.resolve(options.cwd);
    var gradleProcess = spawn(options.gradle, options.args || ['assembleDebug'], {
      cwd: cwd
    });

    gradleProcess.on('error', function(err) {
      reject(err);
    });

    gradleProcess.stdout.setEncoding('utf8');
    gradleProcess.stderr.setEncoding('utf8');

    gradleProcess.stdout.on('data', function(data) {
      console.log(data.trim());
      if (/BUILD\s+FAILED/.test(data.trim())) {
        process.exit(1);
      }
    });

    gradleProcess.stderr.on('data', function(data) {
      console.log(data.trim());
    });

    gradleProcess.on('exit', function(code) {
      if (code !== 0) {
        reject(new Error('build failed'));
      } else {
        resolve('build success!');
      }
    });
  });
};

module.exports = options => {
  return checkEnv(options)
    .then(gradleBuild);
};
