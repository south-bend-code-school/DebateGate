// Initialize Firebase
var config = {
    apiKey: "AIzaSyCS1GCgjRY7d4FTDWiZdnfN5tvYZdiEZIk",
    authDomain: "debategate-ad7d9.firebaseapp.com",
    databaseURL: "https://debategate-ad7d9.firebaseio.com",
    storageBucket: "debategate-ad7d9.appspot.com",
    messagingSenderId: "255967666677"
};
firebase.initializeApp(config);


//to get the chat room
var chatroom = location.search.split('topic=')[1];
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
