
var WebSocket = require('ws');
var WebSocketServer = WebSocket.Server;
var port = 3001;
var ws = new WebSocketServer({
    port: port
});

// Records the incoming and outgoing messages
var messages = [];
var topic = "***Topic is 'Nothing'";


console.log('websockets server started');

// On WebSocket Connection
ws.on('connection', function (socket) {
    console.log('client connection established');

    //send topic after every connection
    socket.send(topic);

    // send all old messages to new connections 
    messages.forEach(function (msg) {
        socket.send(msg);
    });

    // When socket receives a message 
    socket.on('message', function (data) {
        if(data.split(' ')[0] === '/topic')
        {
            data = data.replace('/topic ', '');
            topic = "***Topic is '" + data + "'";
            data = "***Topic has changed to '" + data + "'";
        }
        else 
        {   
            messages.push(data);
        }
        console.log('message received: ' + data);
        // send new messages to all users fresh
        ws.clients.forEach(function (clientSocket) {
            clientSocket.send(data);
        });
    });
});