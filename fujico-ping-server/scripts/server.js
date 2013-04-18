var port = process.env.PORT || 8080

var app = require('http').createServer();

//app.listen(port);

var sys = require('sys')
var exec = require('child_process').exec;

var url = 'http://hitobank-test.herokuapp.com/sessions';

function puts(error, stdout, stderr) { sys.puts(stdout) }
//exec("ping -c 3 -t hitobank.jp", puts);


process.on('uncaughtException', function(err) {
  console.log('Caught exception: ' + err);
});

setTimeout(function() {
  console.log('This will still run.');
}, 1000);



//setTimeout(makeRequest, 30000);


counter = 0;
function makeRequest(error, stdout, stderr) {
	exec("curl " + url, puts)
	counter = counter + 1
	console.log( counter + '====================================')
}

console.log('Server running at http://127.0.0.1:' + port);
