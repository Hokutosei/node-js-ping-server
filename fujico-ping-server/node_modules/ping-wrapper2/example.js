var ping = require('./ping');
var exec = ping('google.com');

exec.on('data', function(data) {
	console.log(data);
});

exec.on('exit', function(data) {
	console.log(data);
});