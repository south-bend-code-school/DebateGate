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
var topic = decodeURI(location.search.split('topic=')[1]);
var chatroom = topic.split('&name=')[0];
myDataRef = firebase.database().ref(chatroom);
myDataRef2 = firebase.database().ref(chatroom);
var Neutral = [];
var Against = [];
var For = [];

//get chatroom user name and title from URL
var tmp = location.search.split('topic=')[1];
var tmp2 = tmp.split('&name=')[1];
var member_name = tmp2.split('&stance=')[0];
var stance = tmp2.split('&stance=')[1];


//call reference once to get topic question and set it to header tag in html
myDataRef2.on('value',function(snapshot){
    document.getElementById("question").innerHTML = snapshot.child("Question").val();
});

$('#messageInput').keypress(function (e) {
  if(e.keyCode == 13) { //keyCode 13 is the "enter key"
    var text = $('#messageInput').val();
    myDataRef.push({name:member_name,text:text});
    $('#messageInput').val('');
  }
});

myDataRef.on('child_added', function(snapshot) {
    //Get list of members (For, Against, Neutral) from topic subtree; used for determining color;
    myDataRef.on('value', function(snapshot2){
        try {
            For = Object.values(snapshot2.val()["For"]);
        }
        catch(err){}
        try {
            Neutral = Object.values(snapshot2.val()["Neutral"]);
        }
        catch(err){}
        try {
            Against = Object.values(snapshot2.val()["Against"]);
        }
        catch(err){}
    });

    if(snapshot.key !== "Question" && snapshot.key !=="Neutral" && snapshot.key !== "Against" && snapshot.key !== "For"){
        var message = snapshot.val();
        displayChatMessage(message.name, message.text);
    }
});

function displayChatMessage(name, text) {
    //check lists of For,Aginst,Neutral to change color text based on stance
    if($.inArray(name,For) > -1){
        $('<div/>', {text: name+': '+text}).css('color','blue').appendTo('#messagesDiv');
    }
    else if($.inArray(name,Against) > -1){
        $('<div/>', {text: name+': '+text}).css('color','red').appendTo('#messagesDiv');
    }
    else if($.inArray(name,Neutral) > -1){
        $('<div/>', {text: name+': '+text}).css('color','green').appendTo('#messagesDiv');
    }
    $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
};
