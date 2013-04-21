//var func = 0;
//(function() {
//    var dataArray = [];
//
//    // initialize hosts first
//
//    var array = [];
//    var requestCounter = 0;
//    var freeCounter = 0
//    setTimeout(makeRequest, 1000);
//    function makeRequest() {
//        for(var i = 0; i < myHostsOptions.hostsLength(); i++) {
//            console.log('requesting')
//            (function(i) {
//                var startTime = new Date();
//                var hostName = myHostsOptions.url(i);
//                http.get('http://' + myHostsOptions.url(i), function(res) {
//                    if (array.length > myHostsOptions.hostsLength() -1) { array = []; }
//                    var data = {
//                        host: myHostsOptions.url(i),
//                        counter: requestCounter,
//                        headers: JSON.stringify(res.headers),
//                        statusCode: res.statusCode,
//                        responseTime: new Date() - startTime,
//                        scriptRunTime: res.headers['x-runtime']
//                    };
//                    array.push(data);
//                });
//                requestCounter++;
//            })(i);
//        }
//        dataUpdate();
//        setTimeout(makeRequest, 1000);
//    }
//    function dataUpdate() {
//        if (array.length != 0) {
//            io.sockets.emit('server_msg', { data: array });
//            for(var i = 0; i < array.length; i++) {
//                var testData = new TestData(array[i]);
//                console.log('===========================');
//                //console.log(array[i]);
//                console.log(testData)
//                testData.save(function(err) {
//                    if (err) { console.log('error saving!') }
//                    else { console.log('saved!') }
//                })
//            }
//        }
//    }
//
//
//    function findOrMakeHosts() {
//        console.log('find');
//        (function() {
//            for(var i = 0; i < myHostsOptions.hostsLength(); i++) {
//                (function(i) {
//                    var myHost = myHostsOptions.url(i);
//                    console.log('executing.. ' + myHost);
//                    Host.find({ 'name' : myHost}, function(err, host) {
//                        if (err) {
//                            console.log('Error finding');
//                        } else {
//                            if(host == '') {
//                                console.log('Host not found.. Creating..');
//                                var newHost = new Host({
//                                    name: myHost,
//                                    url: 'http://' + myHost
//                                }).save(function(err) {
//                                        if (err) { console.log('Could not save host.. ' + myHost)
//                                        } else { console.log('Saved!.. ' + myHost) }
//                                    })
//                                return
//                            }
//                            dataArray.push(host[0])
//                            console.log('executed ' + myHost)
//                        }
//                        console.log('Host found.. ' + dataArray[i]['name']);
//                        console.log(dataArray.length)
//                    })
//                })(i);
//            }
//        })();
//    }
//
//
//    function getHosts() {
//        console.log('Getting Hosts');
//        return {
//            findOrCreateHosts: function() {
//                console.log('executing host find');
//                for(var i = 0; i < myHostsOptions.hostsLength(); i++) {
//                    (function(i) {
//                        var myHost = myHostsOptions.url(i);
//                        console.log('executing.. ' + myHost);
//                        Host.find({ 'name' : myHost}, function(err, host) {
//                            if (err) {
//                                console.log('Error finding');
//                            } else {
//                                if(host == '') {
//                                    console.log('Host not found.. Creating..');
//                                    var newHost = new Host({
//                                        name: myHost,
//                                        url: 'http://' + myHost
//                                    }).save(function(err) {
//                                            if (err) { console.log('Could not save host.. ' + myHost)
//                                            } else { console.log('Saved!.. ' + myHost) }
//                                        })
//                                } else {
//                                    console.log(host)
//                                    dataArray.push(host);
//                                    console.log('Host found.. ' + dataArray[i]);
//                                    console.log(dataArray.length)
//                                    console.log(dataArray)
//                                }
//                            }
//                        })
//                    })(i);
//                }
//                executeRequest()
//            },
//            myHosts: dataArray.length,
//
//            requestDelay: function() {
//                return loop_delay;
//            }
//        }
//
//    }
//
//})();
//

