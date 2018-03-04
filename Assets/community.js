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
    arrayOfCommunity = snapshot.val().communityList;
}, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });


  function snapshotToArray(snapshot) {
    var returnArr = [];

    snapshot.forEach(function(childSnapshot) {
        var item = childSnapshot.val();
        item.key = childSnapshot.key;

        returnArr.push(item);
    });

    return returnArr;
    console.log("This should be an array: " + returnArr);
};

firebase.database().ref('communityList').on('value', function(snapshot) {
  console.log(snapshotToArray(snapshot));
});