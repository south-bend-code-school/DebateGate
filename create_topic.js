// Initialize Firebase
var config = {
    apiKey: "AIzaSyCS1GCgjRY7d4FTDWiZdnfN5tvYZdiEZIk",
    authDomain: "debategate-ad7d9.firebaseapp.com",
    databaseURL: "https://debategate-ad7d9.firebaseio.com",
    storageBucket: "debategate-ad7d9.appspot.com",
    messagingSenderId: "255967666677"
};
firebase.initializeApp(config);

//Reference databse
var dbRef = firebase.database().ref();

//On click, create new node in db with given topic name, 
//add child with given topic description
//Load groups again
$('#submitButton').click(function (e) {
    var topic = $('#topicInput').val();
    var question = $('#questionInput').val();
    dbRef.child(topic).set({'Question':question});
    location.assign('topics.html');
});



