var ping =  require('ping-wrapper2');

var exec = ping('hitobank.herokuapp.com', { count: 20 });

console.log(exec)

exec.on('data', function(data) {
	console.log(data);
});


exec.on('exit', function(data) {
	console.log(data);
})
