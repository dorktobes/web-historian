var path = require('path');
var archive = require('../helpers/archive-helpers');
var utils = require('./http-helpers');
var fs = require('fs');
var url = require('url');
// require more modules/folders here!

var router = {
  '/': function (res) {
    res.writeHead(200, utils.headers);
    fs.readFile('./web/public/index.html', function (err, data) {
      if (err) { 
        throw err; 
      } else { 
        res.end(data); 
      } 
    });
  },
  '/styles.css': function (res) {
    res.writeHead(200, utils.headers);
    fs.readFile('./web/public/styles.css', function (err, data) {
      if (err) { 
        throw err; 
      } else { 
        res.end(data); 
      } 
    });
  },
};

exports.handleRequest = function (req, res) {
  console.log(req.method, req.url);
  console.log('url stuff', url.parse(req.url).pathname);
  
  if (req.method === 'GET') {
    //do something
    if (router.hasOwnProperty(req.url)) {
      router[req.url](res);
      
    } else {
      //404
    }
  } else {
    res.end(archive.paths.list);
    
  }
  //.  /something/domain?q='myquery'


};
