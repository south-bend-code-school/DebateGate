var myDataRef;

var config = {
  apiKey: "AIzaSyDOniRNpzK3BohOL8Ms_grksLpoX-RFd9o",
  authDomain: "co-labz.firebaseapp.com",
  databaseURL: "https://co-labz.firebaseio.com",
  storageBucket: "co-labz.appspot.com",
  messagingSenderId: "417450605238"
};

firebase.initializeApp(config);

//to get the chat room
var chatroom = location.search.split('room=')[1];
myDataRef = firebase.database().ref(chatroom);
//myDataRef = new Firebase('https://fiery-heat-2588.firebaseio.com');

$('#messageInput').keypress(function (e) {
  if(e.keyCode == 13) { //keyCode 13 is the "enter key"
    var name = $('#nameInput').val();
    var text = $('#messageInput').val();
    myDataRef.push({name:name,text:text});
    $('#messageInput').val('');
  }
});

myDataRef.on('child_added', function(snapshot) {
  var message = snapshot.val();
  displayChatMessage(message.name, message.text);
})

function displayChatMessage(name, text) {
  $('<div/>').text(text).prepend($('<em/>').text(name+': ')).appendTo($('#messagesDiv'));
  $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
};
