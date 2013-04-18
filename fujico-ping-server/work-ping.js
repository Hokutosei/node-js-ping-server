var app = require('http').createServer(handler),
    fs = require('fs'),
    io = require('socket.io').listen(app);

var port = 8888, localhost = '0.0.0.0';

app.listen(port, localhost);

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

io.sockets.on('connection', function(socket){
	console.log(app);
  socket.emit('news', { hello: 'jeanepaul' });
  socket.on('my_event', function(data) {
  	console.log(data);
  });



    app.get('http://apple.com', function(res) {
        console.log('==========================================');
        console.log('sending request to.. ' + myHosts.url(i));
        console.log('status code: ' + res.statusCode);
        console.log('headers:' + JSON.stringify(res.headers));
        header = JSON.stringify(res.headers);
        console.log('==========================================')
      }).on('error', function(e) {
            console.log(e.message)
    })











//function hosts() {
//	var url = ['hitobank.herokuapp.com', 'hitobank-test.herokuapp.com']
//  return url
//}
//
//var myHosts = {
//  url: function(counter) {
//		return hosts()[counter];
//  },
//  lengthHosts: function() {
//    return hosts().length
//  }
//}
//
//function test(url) {
//  for(var i = 0; i < myHosts.lengthHosts(); i++) {
//    (function(i) {
//		    http.get('http://' + myHosts.url(i), function(res) {
//      			console.log('==========================================')
//            console.log('sending request to.. ' + myHosts.url(i))
//            console.log('status code: ' + res.statusCode);
//    				console.log('headers:' + JSON.stringify(res.headers))
//        		header = JSON.stringify(res.headers)
//						console.log('==========================================')
//					}).on('error', function(e) {
//						console.log(e.message)
//				})
//    })(i)
//  }
//	var timer = setTimeout(test, delay)
//	counter++
//	console.log(counter)
//}
  

  
  

});
console.log('Server is running at ' + localhost + '...')

