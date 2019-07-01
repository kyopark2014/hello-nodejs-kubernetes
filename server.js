const express = require('express');
const server = express();

server.get('/', (req,res) => {
	res.send('Hello World!');
});

server.listen(8080, () => {
	console.log('This server is running on port 8080\n');
});
