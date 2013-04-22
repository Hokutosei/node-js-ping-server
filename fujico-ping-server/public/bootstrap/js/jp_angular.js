'use strict';

var app = angular.module("lxJpNetworking", []);

app.factory('socket', function($rootScope) {
    var socket = io.connect('http://0.0.0.0:8888');
    return {
        on: function (eventName, callback) {
            socket.on(eventName, function() {
                var args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(socket, args)
                })
            })
        },
        emit: function(eventName, data, callback) {
            socket.emit(eventName, data, function() {
                var args = arguments;
                $rootScope.$apply(function() {
                    if (callback) {
                        callback.apply(socket, args);
                    }
                });
            })
        }
    }
});

app.controller('AppCtrl', function($scope, socket) {
    var dataArray = [];
    $scope.hostData;

    socket.emit('connection');
    socket.on('serverList', function(hostData) {
        for(var i = 0; i < hostData.data.length; i++) {
            if (dataArray.length > hostData.data.length -1) { dataArray = [] }
            dataArray.push(hostData.data[i])
        }
        //console.log(dataArray);
        console.log(dataArray);
        $scope.hostData = dataArray;
        $scope.serverStartTime = hostData.serverStartTime;
    });

    socket.on('send:toSockets', function(data) {
        $.each(data, function(key, value) {
            var hostName = value['host'];
            $.each(dataArray, function(key, value) {
                if (value['name'] == hostName) {
                    if(value['responses'].length >= 1) { value['responses'] = [] }
                    value['responses'].push(data.serverData);
                    var responseTime = value['responses'][0]['responseTime'].replace('ms', '')
                    console.log(responseTime);
                    var host = $scope.formatClassName('.' + hostName + '_chart');
                    $(host).easyPieChart({
                        animate: 1000,
                        barColor: '#0099CC',
                        lineWidth: 4
                    }).data('easyPieChart').update($scope.calculateDataToPercent(responseTime))
                }
            })
        });
        console.log(dataArray);
    });

    socket.on('server_msg', function(data) {
        $scope.counter = 'Get: ' + data.counter + ' requests';
        $scope.statusCode = 'StatusCode: ' + data.statusCode;
        $scope.scriptRunTime = 'ScriptRunTime: ' + data.scriptRunTime;
        $scope.responseTime = 'ResponseTime: ' + data.responseTime;
        $scope.serverHostDataMessages = data.data;
//        var data = {
//            host: myHostsOptions.url(i),
//            counter: requestCounter,
//            headers: JSON.stringify(res.headers),
//            statusCode: res.statusCode,
//            responseTime: new Date() - startTime,
//            scriptRunTime: res.headers['x-runtime']
//        };

    });


    $scope.calculateDataToPercent = function(data) {
        return (data.replace('ms', '') / 1000) * 100;
    }

    $scope.formatClassName = function(data) {
        return data.replace('.herokuapp.com', '');
    }

});


