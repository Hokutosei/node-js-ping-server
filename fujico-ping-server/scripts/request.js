var http = require('http');
var port = 8080;

counter = 0
for(counter = 0; counter < 10; counter++) {
  	http.get('http://hitobank.herokuapp.com', function(res) {
			console.log(res.statusCode);
		}).on('error', function(e) {
			console.log(e.message)
		})

  var x = 0
  while(x < 1000) {
    console.log(x)
  	x++
  }
  
  //console.log(counter + ' ===============================')
}


http.createServer().listen(port);

console.log('running at 127.0.0.1' + port)

