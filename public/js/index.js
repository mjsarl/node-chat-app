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

socket.on('newLocationMessage', function (message){
  console.log('New Location Message received', message);
  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank"=>Current Location</a>');
  li.text(`${message.from}: `);
  a.attr('href', message.url);
  li.append(a);

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

var locationButton = jQuery('#send-location');

locationButton.on('click', function (){
  if(!navigator.geolocation){
    return alert('Geolocation not supported by this browser');
  }

  navigator.geolocation.getCurrentPosition(function (position){
      console.log(position);
      socket.emit('createPositionMessage', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
  }, function (){
    alert('Could not get geo location');
  });
});
