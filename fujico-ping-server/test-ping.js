var http = require('http');
var port = 4000

var fs = require('fs');

var counter = 0
var header;

http.createServer(function(req, res) {	
  res.writeHead(200, { 'Content-Type' : 'text/plain' });
  res.end('{Total Request ' + counter + "\n" + 'Header: ' + header);
}).listen(port, '0.0.0.0');

var delay = 29000

var timer = setTimeout(test, delay);

function hosts() {
	var url = ['hitobank.herokuapp.com', 'hitobank-test.herokuapp.com']
  return url
}

var myHosts = {
  url: function(counter) {
		return hosts()[counter];
  },
  lengthHosts: function() {
    return hosts().length
  }  
}

function test(url) {  
  for(var i = 0; i < myHosts.lengthHosts(); i++) {
    (function(i) {
		    http.get('http://' + myHosts.url(i), function(res) {
      			console.log('==========================================')
            console.log('sending request to.. ' + myHosts.url(i))
            console.log('status code: ' + res.statusCode);
    				console.log('headers:' + JSON.stringify(res.headers))
        		header = JSON.stringify(res.headers)
						console.log('==========================================')
					}).on('error', function(e) {
						console.log(e.message)
				})
    })(i)
  }  
	var timer = setTimeout(test, delay)
	counter++
	console.log(counter)
}
console.log('running at 127.0.0.1' + port)

console.log(myHosts.lengthHosts())

console.log(counter)
console.log('1st');



