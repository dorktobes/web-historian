// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var request = require('download-file');
//var paths = require('../helpers/archive-helpers.js');
//console.log('look at our paths, or some shit', p);
var path = require('path');

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

exports.htmlFetcher = function(url) {
  var options = {
    directory: exports.paths.archivedSites,
    filename: url + '.txt'
  };
  request(url, options, function(err) {
    if (err) {
      throw err;
    }
    console.log('BOOM');
  });
};