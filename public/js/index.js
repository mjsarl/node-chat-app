var socket = io();
socket.on('connect', function (){
  console.log('Connected to server');

  // socket.emit('createMessage', {
  //   from: 'andrew@example.com',
  //   text: 'Hi this is a test message from the browser'
  // });
});

socket.on('disconnect', function (){
  console.log('Disconnected from server.');
});

socket.on('newMessage', function (message){
  console.log('New Message received', message);
  var li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  jQuery('#messages').append(li);
});


jQuery('#message-form').on('submit', function (e){
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function (data){
    console.log('Server says: Got it', data);
  });

});
