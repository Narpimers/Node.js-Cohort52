/**
 * Exercise 3: Create an HTTP web server
 */

const http = require('http');
const fs = require('fs');

//create a server
let server = http.createServer(function (req, res) {
	if (req.url === '/') {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'text/html');
		fs.readFile('./index.html', (err, data) => {
			if (err) {
				console.error(err);
				return;
			}
			res.send(data);
		})
	}
	if (req.url === '/index.js') {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/javascript');
		fs.readFile('./index.js', (err, data) => {
			if (err) {
				console.error(err);
				return;
			}
			res.send(data);
		})
	}
	if (req.url === '/styles.css') {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'text/css');
		fs.readFile('./styles.css', (err, data) => {
			if (err) {
				console.error(err);
				return;
			}
			res.send(data);
		})
	}
	res.end();
});

server.listen(3000); // The server starts to listen on port 3000