// Initialize Firebase
var config = {
    apiKey: "AIzaSyCS1GCgjRY7d4FTDWiZdnfN5tvYZdiEZIk",
    authDomain: "debategate-ad7d9.firebaseapp.com",
    databaseURL: "https://debategate-ad7d9.firebaseio.com",
    storageBucket: "debategate-ad7d9.appspot.com",
    messagingSenderId: "255967666677"
};
firebase.initializeApp(config);

//Create References to root of database and root to storage
const dbRef = firebase.database().ref();

//Get chat room, user name, and position in debate once "Join Debate" is pressed
$('#joinButton').click(function (e) {
    //get Name value
    var name = $('#textInput').val();
    //get chat room topic    
    var topic = location.search.split('topic=')[1];
    //get user position in debate
    var choice = $("input[name='Position']:checked").val();
    if(choice){
        var title = choice;
    }
    //Add name to members list
    dbRef.child(topic).child(title).push(name);

    //go to chat room with topic, name, and position
    location.assign('chat.html?topic='+topic+'&name='+name+'&title='+title);
});


