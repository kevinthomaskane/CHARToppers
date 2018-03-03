// Initialize Firebase
var config = {
    apiKey: "AIzaSyBNbAVWvS2T4Zd8C24AdMh8mil2LilBvMg",
    authDomain: "unexmusicgroupproject.firebaseapp.com",
    databaseURL: "https://unexmusicgroupproject.firebaseio.com",
    projectId: "unexmusicgroupproject",
    storageBucket: "unexmusicgroupproject.appspot.com",
    messagingSenderId: "360432454628"
  };
  firebase.initializeApp(config);



  var database = firebase.database();

// Selecting song
  var arrayOfCommunity = [];

$(document).on("click", "#shareCommunity", function () {
    
    //FIREBASE---------------------
    database.ref().set({
        communityList:arrayOfCommunity
      });
});

database.ref().on("value", function(snapshot) {
    console.log("Here's what Firebase sent back: " + snapshot.val());
    arrayOfCommunity = snapshot.val().communityList;
    console.log("Here's what Firebase sent back: " + arrayOfCommunity);
}, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
