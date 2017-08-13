var socket = io();
socket.on('connect', function (){
  console.log('Connected to server');

});

socket.on('disconnect', function (){
  console.log('Disconnected from server.');
});

socket.on('newMessage', function (message){
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    time: formattedTime
  });

jQuery('#messages').append(html);
});

socket.on('newLocationMessage', function (message){
  console.log('New Location Message received', message);
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#location-message-template').html();
  var html = Mustache.render(template, {
    url: message.url,
    from: message.from,
    time: formattedTime
  });

jQuery('#messages').append(html);
});


jQuery('#message-form').on('submit', function (e){
  e.preventDefault();
  var messageTextBox = jQuery('[name=message]');
  socket.emit('createMessage', {
    from: 'User',
    text: messageTextBox.val()
  }, function (data){
    messageTextBox.val(''); //clear text box
    console.log('Server says: Got it', data);
  });

});

var locationButton = jQuery('#send-location');

locationButton.on('click', function (){
  if(!navigator.geolocation){
    return alert('Geolocation not supported by this browser');
  }

  locationButton.attr('disabled','disabled').text('Sending location');
  navigator.geolocation.getCurrentPosition(function (position){
      locationButton.removeAttr('disabled').text('Send location');
      // console.log(position);
      socket.emit('createPositionMessage', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
  }, function (){
    locationButton.removeAttr('disabled').text('Send location');
    alert('Could not get geo location');
  });
});
