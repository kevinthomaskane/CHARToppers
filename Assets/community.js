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

  

$(document).on("click", "#shareCommunity", function () {
    var songName= $(this).attr("class");
    console.log(songName);
  database.ref(songName).set({
    added: true,
    comments: [],
    reactions: []
  });
});

database.ref().on("value", function(snap) {
    
    var songList= snap.val();
    console.log(songList);

    for(var prop in songList) {
        console.log(prop);
        $.ajax({
            method: "GET",
            url: "http://ws.audioscrobbler.com/2.0/?method=track.search&track=" + prop + "&api_key=6efca9dcca0f53fefbaf77e99b6dddf2&format=json"
        }).done(function (data){
            console.log(data)
            var obj = data.results.trackmatches.track[0].image[2];
            $(".collapsible").append(`
                    <li class="resultList">
                    <div class="collapsible-header truncate"><img src="${obj[Object.keys(obj)[0]]}">${data.results.trackmatches.track[0].name} - ${data.results.trackmatches.track[0].artist}</div>
                    <div class="collapsible-body">
                    <a id="playYoutube" class="${data.results.trackmatches.track[0].name}"href="#"><i class="fab fa-youtube"></i>Play YouTube video</a> <br>
                    <a id="shareCommunity" class="${data.results.trackmatches.track[0].name}"href="#"><i class="fas fa-share-alt"></i>Share with community</a>
                    </div>
                    </li>  
            `)
            $("#resultsArea").html("")
        }) 
    }

    
    
  });

  function youtubeCall(song) {
    event.preventDefault();
    var search = song
    console.log(search);
    var queryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&order=viewCount&maxResults=1&q=" + search + "lyrics&type=video&key=AIzaSyAjjM5Zlo-im2fzE9Z6ewpsvBw9Q-DIPeo"
    $.ajax({
        method: "GET",
        url: queryURL

    }).done(function (data) {
        var vidId = data.items[0].id.videoId;
        console.log(data);
        console.log(vidId);
        $(".slider").html('')
        $("#video").html("<blockquote class='embedly-card'><h4><a href='https://www.youtube.com/watch?v=" + vidId + "'></a></h4></blockquote>")
    });

}

  $(document).on("click", "#playYoutube", function(){
    
var search = $(this).attr("class");     
    youtubeCall(search)
  });
        


//-------------------------------OLD CODE-----------------------------------------------------------------
//________________________________________________________________________________________________________
// Selecting song
/*
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
    
};

firebase.database().ref('communityList').on('value', function(snapshot) {
  var FBsongs = snapshotToArray(snapshot);
  console.log(FBsongs);
  
    for (let i = 0; i < FBsongs.length; i++){
      var search = FBsongs[i];
      console.log(search)
      $.ajax({
          method: "GET",
          url: "http://ws.audioscrobbler.com/2.0/?method=track.search&track=" + search + "&api_key=6efca9dcca0f53fefbaf77e99b6dddf2&format=json"
      }).done(function (data){
          console.log(data)
          var obj = data.results.trackmatches.track[i].image[2];
          $(".collapsible").append(`
                  <li class="resultList">
                  <div class="collapsible-header truncate"><img src="${obj[Object.keys(obj)[0]]}">${data.results.trackmatches.track[i].name} - ${data.results.trackmatches.track[i].artist}</div>
                  <div class="collapsible-body">
                  <a id="playYoutube" class="${data.results.trackmatches.track[i].name}"href="#"><i class="fab fa-youtube"></i>Play YouTube video</a> <br>
                  <a id="shareCommunity" class="${data.results.trackmatches.track[i].name}"href="#"><i class="fas fa-share-alt"></i>Share with community</a>
                  </div>
                  </li>  
          `)
          $("#resultsArea").html("")
      })
  }
  
});


*/




































$(document).on("click", "#playYoutube", function(){
  $(".carousel").html("")
})


if (localStorage.getItem("favoriteImage")) {
  var arrayOfImgs = JSON.parse(localStorage.getItem("commImage"));
  for (let i = 0; i < arrayOfImgs.length; i++) {
      
      console.log(arrayOfImgs[i])
      $(".carousel").append(`
      <a class="carousel-item" href="#one!"> <img src="${arrayOfImgs[i]}"> </a>
      `)
      $('.carousel-item').first().addClass('active');
  }
  $(".carousel").carousel();

}
