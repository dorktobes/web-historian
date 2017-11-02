var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var https = require('https');
var http = require('http');
var htmlFetcher = require('../workers/htmlfetcher.js');
htmlFetcher = htmlFetcher.htmlFetcher;

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
  fs.readFile(exports.paths.list, function(err, data) {
    if (err) {
      throw err;
    } else {
      data = data + '';
      var dataArr = data.split('\n');
      callback(dataArr);
    }
  });
};

exports.isUrlInList = function(url, callback) {
  var contains = false;
  exports.readListOfUrls(function(arr) {
    contains = arr.indexOf(url) >= 0;
    callback(contains);
  });

};

exports.addUrlToList = function(url, callback) {
  url = String(url) + '\n';
  fs.appendFile(exports.paths.list, url, function(err) {
    if (err) {
      throw err;
    } else {
      callback();
    }
  });
};

exports.isUrlArchived = function(url, callback) {
  fs.access(exports.paths.archivedSites + '/' + url, function(err) { 
    callback(!err);
  });
};

exports.downloadUrls = function(urls) {
  _.each(urls, url => {
    exports.isUrlArchived(url, function(exists) {
      if (!exists) {
       //download it
        https.get(`https://${url}`, function(resp) {
          let data = '';
          resp.on('data', (chunk) => {
            data += chunk;
          }).on('end', () => {
            fs.writeFile(exports.paths.archivedSites + '/' + url, data, function(err) {
              if (err) {
                throw err;
              } else {
                console.log('Wrote ' + url + ' to ' + exports.paths.archivedSites);
              }
            });
          });
          
        });
      }
    });
  // urls.forEach(function(url) {
  //   });  
  });
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
};
