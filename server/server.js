const path = require ('path');
const publicPath = path.join(__dirname, '../public');
const http = require('http');
const express = require ('express');
const socketIO = require('socket.io');
const port = process.env.PORT || 3000;

const {generateMessage, generateLocationMessage} = require('./utils/message');



var app = express();
var server = http.createServer(app);
var io = socketIO(server);


app.use(express.static(publicPath));

io.on('connection', (socket)=>{
    //console.log('New user connected.');

    socket.emit('newMessage', generateMessage('Your chat server','Welcome - You are ready to chat'));

    socket.broadcast.emit('newMessage', generateMessage('Your chat server', 'A new user has joined the chat'));

    socket.on('createMessage', (newMessage, cb)=>{
        //console.log('createMessage received:', newMessage);
        io.emit('newMessage', generateMessage(newMessage.from, newMessage.text));
        cb('Received server side');
      });

      socket.on('createPositionMessage', (locationMessage)=>{
        //console.log('createPositionMessage received:', locationMessage);
        io.emit('newLocationMessage', generateLocationMessage('Admin', locationMessage.latitude, locationMessage.longitude)
      );
      });

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
