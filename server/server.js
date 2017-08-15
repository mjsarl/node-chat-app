const path = require ('path');
const publicPath = path.join(__dirname, '../public');
const http = require('http');
const express = require ('express');
const socketIO = require('socket.io');
const port = process.env.PORT || 3000;

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealstring} = require('./utils/validation');
const {Users} = require('./utils/users');



var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();


app.use(express.static(publicPath));

io.on('connection', (socket)=>{
    //console.log('New user connected.');

    
    socket.on('join', (params, errcb)=> {
      if(!isRealstring(params.name) || !isRealstring(params.room)){
        return errcb('Invalid Parameter')
      }         
      
      socket.join(params.room);
      users.removeUser(socket.id); //kill previous session
      users.addUser(socket.id, params.name, params.room);
      
      io.to(params.room).emit('updateUserList', users.getUserList(params.room));
      socket.emit('newMessage', generateMessage('Your chat server','Welcome - You are ready to chat'));

      socket.broadcast.to(params.room).emit('newMessage', generateMessage('Your chat server', `${params.name} has joined the chat`));
  
      errcb();
     });
  
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
  

    socket.on('disconnect', ()=> {
      var user = users.removeUser(socket.id);
      
      if(user){
        io.to(user.room).emit('updateUserList', users.getUserList(user.room));
        io.to(user.room).emit('newMessage', generateMessage('Your Chat Server', `${user.name} has left the chat.`));
      }
      console.log('++++++ User Disconnect', user);
    });
});



server.listen(port, ()=> {
  console.log(`Server is up on port ${port}`);
});
