# ping-wrapper #

Native wrapper for ping.

## Install ##

    npm install ping-wrapper2

## Example  ##

```javascript
var ping = require('ping-wrapper2');
var exec = ping('google.com', { count: 20 }); // default 10 packets

ping.on('data', function(data){
	console.log(data);
	// { no: 1, bytes: 64, time: 54, ttl: 1 }
});

ping.on('exit', function(data){
	console.log(data);
	// { sent: 10, recieved: 10, loss: 0, time: 9010 }
});
```

## License ##

(The MIT License)

Copyright (c) 2009-2012 Sebastian McKenzie <sebmck@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.