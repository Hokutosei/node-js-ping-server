//var app = require('express').createServer(),
var express = require('express'),
    app = express(),
    fs = require('fs'),
    http = require('http'),
    server = http.createServer(app),
    io = require('socket.io').listen(server),
    mongoose = require('mongoose');


var port = 8888, localhost = '0.0.0.0';
var loop_delay = 28000;
var serverStartTime = new Date().toLocaleString();

mongoose.connect('mongodb://jeanepaul:jinpol@ds033757.mongolab.com:33757/jeanepaul-networking-2');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));

// MY schema
var testDataSchema = new mongoose.Schema({
    host: String,
    counter: String,
    headers: String,
    statusCode: String,
    responseTime: String,
    scriptRunTime: String
});

var connectionResponseSchema = new mongoose.Schema({
    host: String,
    counter: String,
    headers: String,
    statusCode: String,
    responseTime: String,
    scriptRunTime: String,
    created_at: String
});

var hostSchema = new mongoose.Schema({
    name: String,
    url:String,
    created_at: String,
    responses: [connectionResponseSchema]
});

var ConnectionResponse = mongoose.model('ConnectionResponse', connectionResponseSchema);
var Host = mongoose.model('Host', hostSchema);

var TestData = mongoose.model('TestData', testDataSchema);




app.get(/^(.+)$/, function(req, res) {
    res.sendfile('public/' + req.params[0]);
});



(function() {
    io.sockets.on('connection', function(socket) {
        var hostList = [];
        Host.find({}, {resposnes: 0}, function(err, host) {
            for (var i = 0; i < host.length; i++) {
                hostList.push(host[i])
            }
            socket.emit('serverList', {data: hostList, serverStartTime: serverStartTime})
        })
    });



    console.log('called');
    var dataArray = [];
    var requestCounter = 0;
    initializeHosts();
    function initializeHosts() {
        Host.find({}, {responses:0}, function(err, host) {
            for(var i = 0; i < host.length; i++) {
                if (dataArray.length > host.length -1) { dataArray = [] }
                dataArray.push(host[i])
            }
            getRequest()
        });
    }

    function getRequest() {
        for (var i = 0; i < dataArray.length; i++) {
            var myHost = dataArray[i]['name'];
            (function(myHost) {
                var startTime = new Date();
                http.get('http://' + myHost, function(res) {
                    var data = {
                        host: myHost,
                        counter: requestCounter,
                        headers: JSON.stringify(res.headers),
                        statusCode: res.statusCode,
                        responseTime: new Date() - startTime + ' ms',
                        scriptRunTime: res.headers['x-runtime'] + ' ms',
                        created_at: new Date()
                    };
                    insertDataToHost(data);
                });
            })(myHost);
            requestCounter++;
            console.log(requestCounter)
        }

        setTimeout(initializeHosts, loop_delay)
    }

    function insertDataToHost(data) {
        var dataArray = []
        var myHost = data['host'];
        Host.update({'name' : myHost}, {$push: {responses: data }}, function(err, host){
            if (err) { console.log('Cannot save.. ' + myHost) }
            else { console.log('saved!') }
            pushDataToSockets(data)
        })
    }

    function pushDataToSockets(data) {
        var myHost = data['host'];
        Host.find({name : myHost}, function(err, result) {
            var responseLength = result[0]['responses'].length
            var data = result[0]['responses'][parseInt(responseLength) -1];
            io.sockets.emit('send:toSockets', { serverData: data })
        })
    }

})();
server.listen(port);

console.log('Server is running at ' + localhost + '...' + port);






