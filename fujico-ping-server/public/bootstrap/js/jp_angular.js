'use strict';

var app = angular.module("lxJpNetworking", []);

app.factory('socket', function($rootScope) {
    //var socket = io.connect('http://localhost:8888');
    var socket = io.connect();
    return {
        on: function (eventName, callback) {
            socket.on(eventName, function() {
                var args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(socket, args)
                });
            });
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
    };
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
                    var responseTime = value['responses'][0]['responseTime'].replace('ms', '');
                    var host = $scope.formatClassName('.' + hostName + '_chart');
                    $(host).easyPieChart({
                        animate: 1000,
                        barColor: '#0099CC',
                        lineWidth: 4,
                        size: 180
                    }).data('easyPieChart').update($scope.calculateDataToPercent(responseTime))
                }
            })
        });
    });

    $scope.createNewHost = function() {
        var data = $scope.hostUrl;
        console.log('outer data' + data);
        sendData(data)
    };

    function sendData(data) {
        socket.emit('client:createNewHost', { name: data, url: 'http://' + data }, function(err, host) {
            if (err) { console.log('not save' + err) }
            else { console.log('saved ' + host)}
        });
    }



    $scope.calculateDataToPercent = function(data) {
        return (data.replace('ms', '') / 1000) * 100;
    };
    $scope.formatClassName = function(data) {
        return data.replace('.herokuapp.com', '').replace('.com', '');
    };

});


