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
        //console.log(dataArray);
        $scope.hostData = dataArray;
        $scope.serverStartTime = hostData.serverStartTime;
    });

    socket.on('send:toSockets', function(data) {
        var rawDataArray = [];
        $.each(data, function(key, value) {
            var hostName = value['host'];
            $.each(dataArray, function(key, value) {
                if (value['name'] == hostName) {
                    if(value['responses'].length >= 1) { value['responses'] = [] }
                    value['responses'].push(data.serverData);

                    var responseTime = value['responses'][0]['responseTime'].replace('ms', '');
                    var host = $scope.formatClassName('.' + hostName + '_chart');

                    $(function() {
                        $(host).easyPieChart({
                            animate: 1000,
                            barColor: $scope.assignColorToStatus(parseInt(responseTime)),
                            lineWidth: 4,
                            size: 180
                        }).data('easyPieChart').update($scope.calculateDataToPercent(responseTime))
                    });
                }
            })
        });
        //console.log(rawDataArray);
        $scope.rawDataArray = dataArray;
    });

    $scope.createNewHost = function() {
        var data = $scope.hostUrl;
        //console.log('outer data' + data);
        //sendData(data)
    };

    function sendData(data) {
        socket.emit('client:createNewHost', { name: data, url: 'http://' + data }, function(err, host) {
            if (err) { console.log('not save' + err) }
            else { console.log('saved ' + host)}
        });
    }


    $scope.assignColorToStatus = function(data) {
        console.log(data < 550);
        if (range(data, 100, 550)) {
            console.log('condition 1');
            return String('#91e842');
        } else if (range(data, 551, 750)) {
            console.log('condition 2');
            return String('#e6ab82');
        } else {
            console.log('condition 3');
            return String('#d66c51');
        }

        function range(data, min, max) {
            return data >= min && data <= max;
        }
    };

    $scope.calculateDataToPercent = function(data) {
        return (data.replace('ms', '') / 1000) * 100;
    };
    $scope.formatClassName = function(data) {
        return data.replace('.herokuapp.com', '').replace('.com', '');
    };

});


