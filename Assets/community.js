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
                    <a id="playYoutube" class="${data.results.trackmatches.track[0].name}"href="#"><i class="fab fa-youtube"></i> Play YouTube video</a> <br>
                    <a id="addFavorite" class="${data.results.trackmatches.track[0].name}" href="#"><i class="far fa-star"></i> Add to your favorites</a>
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
    var queryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&order=viewCount&maxResults=1&q=" + search + "&type=video&key=AIzaSyAjjM5Zlo-im2fzE9Z6ewpsvBw9Q-DIPeo"
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

  if (localStorage.getItem("playlistSong")) {
    var arrayOfFavorites = JSON.parse(localStorage.getItem("playlistSong"));

}
else {
    arrayOfFavorites = [];

}

if (localStorage.getItem("favoriteImage")) {
    var arrayOfImages = JSON.parse(localStorage.getItem("favoriteImage"));
}
else {
    arrayOfImages = [];
}

  $(document).on("click", "#addFavorite", function () {
    Materialize.toast('Added to Favorites', 2000, "blue")
    var playlistSong = $(this).attr("class")
    var favoriteImage = $(this).parent().parent().children().find("img").attr("src")
    if (arrayOfFavorites.indexOf(playlistSong) === -1) {
        arrayOfFavorites.push(playlistSong)
        localStorage.setItem("playlistSong", JSON.stringify(arrayOfFavorites))
        console.log(JSON.parse(localStorage.getItem("playlistSong")))
    }
    if (arrayOfImages.indexOf(favoriteImage) === -1) {
        arrayOfImages.push(favoriteImage)
        localStorage.setItem("favoriteImage", JSON.stringify(arrayOfImages))
        console.log(JSON.parse(localStorage.getItem("favoriteImage")))
    }



})
    