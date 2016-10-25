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
const storageRef = firebase.storage().ref();

//Sync object changes
dbRef.on('value', snapshot=> {
    //get list of all topics
    var dataKeys = Object.keys(snapshot.val());
    for( i in dataKeys){
        if( dataKeys[i] !== "Users"){
            //make new div, h3, p, img for displaying database info
            var topic = document.createElement('h3');
            var question = document.createElement('p');
            var outer_div = document.createElement('div');
            var inner_div = document.createElement('div');
            var image = document.createElement('img');
            var aTag = document.createElement('a');
            aTag.setAttribute('href','join.html?topic='+dataKeys[i]);
            //var alphaRef = storageRef.child("ND_Crest.jpg");

            //create text, load image to put into elements above
            var topicText = document.createTextNode(dataKeys[i]);
            if( snapshot.val()[dataKeys[i]]["Question"] ){
                var questionText = document.createTextNode(snapshot.val()[dataKeys[i]]["Question"]);
            } else {
                var questionText = document.createTextNode("No Question");
            }

            //append text/pic to elements
            topic.appendChild(topicText);
            question.appendChild(questionText);
            //alphaRef.getDownloadURL().then(function(url){
            //    image.src = url;
            //}).catch(function(error){
            //    console.log("in catch function");
            //});
            //add elements to div
            inner_div.appendChild(topic);
            inner_div.appendChild(question);
            //outer_div.appendChild(image);
            //div.appendChild(image);
            //make changes to div css
            outer_div.style.textAlign = "left";
            outer_div.style.border = "solid black 5px";
            outer_div.style.float = "left";
            outer_div.style.width = "75%";
            outer_div.style.height = "100px";
            outer_div.style.margin = "1em";
            outer_div.style.display = "flex";
            outer_div.style.backgroundColor = "LightGray"; 
            inner_div.style.backgroundColor = "Gray";
            inner_div.style.textAlign = "left";
            inner_div.style.display = "inline-grid";
            inner_div.style.width = "75%";
            //append div to div and outer div to a tag
            outer_div.appendChild(inner_div);
            aTag.appendChild(outer_div);
            //append a ref tag (everything) to the body of the html document
            var middle = document.getElementById("middle");
            middle.appendChild(aTag);
        }
    }
});