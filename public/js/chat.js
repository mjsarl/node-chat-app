var socket = io();

function scrollToBottom () {
  // Selectors
  var messages = jQuery('#messages');
  var newMessage = messages.children('li:last-child');
  // Height vars
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();
  
  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }
}

socket.on('connect', function (){
  console.log('Connected to server');
  var params = jQuery.deparam(window.location.search);
  socket.emit('join', params, function(err){
    if(err){
      alert(err);
      window.location.href = '/';
    } else {
      console.log('No error');
    }  
  })

});

socket.on('updateUserList', function (users){
  var ol = jQuery('<ol></ol>');
  users.forEach(function (user) {
    ol.append(jQuery('<li></li>').text(user));
  });
  jQuery('#users').html(ol);
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
scrollToBottom();
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
scrollToBottom();
});


jQuery('#message-form').on('submit', function (e){
  e.preventDefault();
  var messageTextBox = jQuery('[name=message]');
  socket.emit('createMessage', {

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
