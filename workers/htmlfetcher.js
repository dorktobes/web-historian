// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var request = require('download-file');
//var paths = require('../helpers/archive-helpers.js');
//console.log('look at our paths, or some shit', p);
var path = require('path');
var https = require('https');
var fs = require('fs');

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

exports.htmlFetcher = function(url) {
  https.get('https://www.yahoo.com', function(resp) {
    let data = '';
    resp.on('data', (chunk) => {
      data += chunk;
    }).on('end', () => {
      fs.writeFile(exports.paths.archivedSites, data, function(err) {
        if (err) {
          throw err;
        } else {
          console.log('Wrote ' + url + ' to ' + archive.paths.archivedSites);
        }
      });
    });
    
  });
  
  // var options = {
  //   directory: exports.paths.archivedSites,
  //   filename: url
  // };
  // request(url, options, function(err) {
  //   if (err) {
  //     throw err;
  //   }
  // });
};