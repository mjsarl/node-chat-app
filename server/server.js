const path = require ('path');
const publicPath = path.join(__dirname, '../public');
const http = require('http');
const express = require ('express');
const socketIO = require('socket.io');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket)=>{
    console.log('New user connected.');

    socket.on('disconnect', ()=>{
      console.log('Client disconnected from Server.');
    });
});

// app.get('/', (req,res)=>{
//   //res.sendFile(publicPath+'index.html');
// });

server.listen(port, ()=> {
  console.log(`Server is up on port ${port}`);
});
