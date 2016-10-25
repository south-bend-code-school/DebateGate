// Initialize Firebase
var config = {
    apiKey: "AIzaSyCS1GCgjRY7d4FTDWiZdnfN5tvYZdiEZIk",
    authDomain: "debategate-ad7d9.firebaseapp.com",
    databaseURL: "https://debategate-ad7d9.firebaseio.com",
    storageBucket: "debategate-ad7d9.appspot.com",
    messagingSenderId: "255967666677"
};
firebase.initializeApp(config);


//to get the chat room and load message from that node in database
var topic = location.search.split('topic=')[1];
var chatroom = topic.split('&name=')[0];
var myDataRef = firebase.database().ref(chatroom);
var myDataRef2 = firebase.database().ref(chatroom);
var mods;
var reps;
var dems;
//get chatroom user name and title from URL
var tmp = location.search.split('topic=')[1];
var tmp2 = tmp.split('&name=')[1];
var member_name = tmp2.split('&title=')[0];
var title = tmp2.split('&title=')[1];

//Call refernce once ot get topic question and set it to header tag in html
myDataRef2.on('value', function(snapshot){
    document.getElementById("questionHeader").innerHTML = snapshot.child("Question").val();
});

//Get message and store in database
$('#messageInput').keypress(function (e) {
    if(e.keyCode == 13) { //keyCode 13 is the "enter key"
        var text = $('#messageInput').val();
        myDataRef.push({name:member_name,text:text});
        $('#messageInput').val('');
    }
});



//check for all nodes that are actual messages
myDataRef.on('child_added', function(snapshot) {
    if(snapshot.key !== "Question" && snapshot.key !=="Moderators" && snapshot.key !== "Republicans" && snapshot.key !== "Democrats"){
        //Get list of members (moderator, rep, dem) from topic subtree; used for determining color;
        myDataRef.on('value', function(snapshot2){
            console.log(Object.values(Object(snapshot2.val())["Democrats"]));
            mods = Object.values(Object(snapshot2.val())["Moderators"]);
            console.log(Object.values(Object(snapshot2.val())["Republicans"]));
        })
        var message = snapshot.val();
        displayChatMessage(message.name, message.text);
    }
})

//display chat and check for color based on members list
function displayChatMessage(name, text) {
    console.log(name);
    console.log(text);
    console.log(name in dems);
    console.log(reps);
    console.log(name in mods);
    if(name in dems){
        $('<div/>', {text: name+': '+text}).css('color','blue').appendTo('#messagesDiv');
    }
    else if( name in reps){
        $('<div/>', {text: name+': '+text}).css('color','red').appendTo('#messagesDiv');
    }
    else if(name in mods){
        $('<div/>', {text: name+': '+text}).css('color','green').appendTo('#messagesDiv');
    }
    $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
};


