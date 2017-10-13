/*
In the node.js intro tutorial (http://nodejs.org/), they show a basic tcp 
server, but for some reason omit a client connecting to it.  I added an 
example at the bottom.
Save the following server in example.js:
*/

//var net = require('net');
//var server = net.createServer(function(socket) {
//	socket.write('Echo server\r\n');
//	console.log('socket');
//	console.log(socket);
//	socket.pipe(socket);
//});


//server.listen(8083, '127.0.0.1');




const net = require('net');
const server = net.createServer((c) => {
  // 'connection' listener
  console.log('client connected');
  console.log(c);

  var clientAddr = c.remoteAddress + ":" + c.remotePort;

  console.log('Report Device');
  console.log(clientAddr);

  console.log('Socket Address');
  console.log(c.address());

  console.log('Bytes Read');
  console.log(c.bytesRead);
  console.log('socket bytes written');
  console.log(c.bytesWritten);


  c.on('end', () => {
    console.log('client disconnected');
  });
 


  c.on('data', (data) => {
   console.log(data.toString());
//   c.end();
  });
  

  c.write('$');

  console.log('socket bytes written');
  console.log(c.bytesWritten);


  c.pipe(c);
});

server.on('error', (err) => {
  throw err;
});
server.listen(8083, () => {
  console.log('server bound');
});


/*
And connect with a tcp client from the command line using netcat, the *nix 
utility for reading and writing across tcp/udp network connections.  I've only 
used it for debugging myself.
$ netcat 127.0.0.1 1337
You should see:
> Echo server
*/



//var net = require('net');

//var server = net.createServer();  

//server.on('login', function(data){

//console.log('Something is trying to login');
//console.log(data);


//});


//server.on('connection', handleConnection);

//server.listen(8083, '127.0.0.1', function() {  
//  console.log('server listening to %j', server.address());
//});


//function handleConnection(conn) {  
//  console.log(conn);
  

//  var remoteAddress = conn.remoteAddress + ':' + conn.remotePort;
//  console.log('new client connection from %s', remoteAddress);


//  conn.on('V1', onVONE);
//  conn.on('data', onConnData);
//  conn.once('close', onConnClose);
//  conn.on('error', onConnError);


//  function onVONE(d){

//	console.log('V1 connect');
//	console.log(d);

//  }
//  function onConnData(d) {
//    console.log('connection data from %j: %j', remoteAddress, d);
//    console.log(conn);
//    conn.write(d);
//  }

//  function onConnClose() {
//    console.log('connection from %s closed', remoteAddress);
//  }

//  function onConnError(err) {
//    console.log('Connection %s error: %s', remoteAddress, err.message);
//  }
//}






//var net = require('net');

//var server = net.createServer();  

//server.on('V1', function(data){
//console.log('On V1');
//console.log(data);

//});


//server.listen(8083, '127.0.0.1', function() {  
//  console.log('server listening to %j', server.address());
//});





