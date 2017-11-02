var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  //goes over every url in archives/sites.txt
  fs.readFile(exports.paths.list, function(err, data) {
    if (err) {
      throw err;
    } else {
      data = data + '';
      var dataArr = data.split('\n');
      callback(dataArr);
    }
  });
  //callback's every url in archives/sites.txt
  //pass in isUrlInList as callback
};

exports.isUrlInList = function(url, callback) {
  //set switch variable to false
  var contains = false;
  
  exports.readListOfUrls(function(arr) {
    contains = arr.indexOf(url) >= 0;
    callback(contains);
  });
  // check if input url is in readListOfUrls
    // if yes, pass in url to callback, set switch to true
    // return switch 
};

exports.addUrlToList = function(url, callback) {
};

exports.isUrlArchived = function(url, callback) {
};

exports.downloadUrls = function(urls) {
};
