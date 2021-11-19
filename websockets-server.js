var WebSocket = require("ws");
var WebSocketServer = WebSocket.Server;
var port = 3001;
var ws = new WebSocketServer({
  port: port
});

var topics;
var messages = [];

/*eslint-disable-next-line no-console*/
console.log("websockets server started");

ws.on("connection", function(socket) {
  /*eslint-disable-next-line no-console*/
  console.log("client connection established");

  //WIP display topic on connect
  socket.onopen = function(top) {
    socket.send(top);
  };


  messages.forEach(function(msg) {
    socket.send(msg);
  });

  /* WIP topic change */
  socket.on("topic", function(data) {
    topics.push(data);
    ws.clients.get(function(clientSocket) {
      clientSocket.send(data);
    });
  });

  socket.on("message", function(data) {
    /*eslint-disable-next-line no-console*/
    console.log("message received: " + data);
    messages.push(data);
    ws.clients.forEach(function(clientSocket) {
      clientSocket.send(data);
    });
  });
});
