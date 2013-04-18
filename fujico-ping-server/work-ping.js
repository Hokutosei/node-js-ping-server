//var app = require('express').createServer(),
var express = require('express'),
    app = express(),
    fs = require('fs'),
    http = require('http'),
    server = http.createServer(app),
    io = require('socket.io').listen(server);

var port = 8888, localhost = '0.0.0.0';

//app.listen(port, localhost);

function handler(req, res) {
  fs.readFile(__dirname + '/index.html', function(err, data) {
    if (err) {
    	res.writeHead(500);
      return res.end('Error loading index.html');
    }
    res.writeHead(200);
    res.end(data);
  })
}

app.get(/^(.+)$/, function(req, res) {
    res.sendfile('public/' + req.params[0]);
});


function myHosts() {
    return url = ['hitobank.herokuapp.com', 'hitobank-test.herokuapp.com']
}

var myHostsOptions = {
    url: function(counter) {
        return myHosts()[counter];
    },
    hostsLength: function() {
        return myHosts().length
    },
    delay: function() {
        return delay = 2000;
    }
}

var x;
io.sockets.on('connection', function(socket) {
        socket.emit('server_message', {msg: x})
});

var dataArray = [];

for(var i = 0; i < myHostsOptions.hostsLength(); i++) {
    (function(i) {
        dataArray.length = 0;
        setTimeout(makeRequest, myHostsOptions.delay());
        function makeRequest() {
            http.get('http://' + myHostsOptions.url(i), function(res) {
                console.log('==========================================');
                console.log('sending request to.. ' + myHostsOptions.url(i));
//                console.log('status code: ' + res.statusCode);
//                console.log('headers:' + JSON.stringify(res.headers))
//                header = JSON.stringify(res.headers)
//                console.log('==========================================')
//                x = myHostsOptions.url(i);
//                io.sockets.emit('server_msg', { host: myHostsOptions.url(i) });
            });
            setTimeout(makeRequest, myHostsOptions.delay());
            dataArray.push(myHostsOptions.url(i));
            io.sockets.emit('server_msg', { host: myHostsOptions.url(i), data: dataArray });
        }
    })(i);
}

server.listen(port);

console.log('Server is running at ' + localhost + '...' + port)






