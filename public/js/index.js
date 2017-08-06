var socket = io();
socket.on('connect', function (){
  console.log('Connected to server');

  socket.emit('createMessage', {
    from: 'andrew@example.com',
    text: 'Hi this is a test message from the browser'
  });
});

socket.on('disconnect', function (){
  console.log('Disconnected from server.');
});

socket.on('newMessage', function (message){
  console.log('New Message received', message);
});
