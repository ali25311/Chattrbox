/* global require */ //eslint flagging require remove

var http = require("http");
var fs = require("fs");
var extract = require("./extract");
var mime = require("mime");
var wss = require("./websockets-server"); // eslint-disable-line no-unused-vars


var handleError = function(err, res) {
  res.writeHead(404, {
    "Content-Type": "text/html"
  });
  res.write("<script>location.replace('error.html')</script>");
  res.end();
};

var server = http.createServer(function(req, res) {
  /*eslint-disable-next-line no-console*/
  console.log("Responding to a request.");
  var filePath = extract(req.url);
  fs.readFile(filePath, function(err, data) {
    if (err) {
      handleError(err, res);
      return;
    } else {
      res.setHeader("Content-Type", mime.getType(req.url));
      res.end(data);
    }
  });
});
server.listen(3000);
