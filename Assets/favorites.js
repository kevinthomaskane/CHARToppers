


if (localStorage.getItem("playlistSong")) {
    var arrayOfFavs = JSON.parse(localStorage.getItem("playlistSong"));
    console.log(arrayOfFavs)
    for (let i = 0; i < arrayOfFavs.length; i++) {
        var search = arrayOfFavs[i];
        console.log(search)
        $.ajax({
            method: "GET",
            url: "https://ws.audioscrobbler.com/2.0/?method=track.search&track=" + search + "&api_key=6efca9dcca0f53fefbaf77e99b6dddf2&format=json"
        }).done(function (data) {
            console.log(data)
            var obj = data.results.trackmatches.track[0].image[2];
            $(".collapsible").append(`
                     <li class="resultList">
                        <div class="collapsible-header truncate z-depth-1"><img src="${obj[Object.keys(obj)[0]]}">${data.results.trackmatches.track[0].name} - ${data.results.trackmatches.track[0].artist}</div>
                         <div class="collapsible-body z-depth-1">
                         <a id="playYoutube" class="${data.results.trackmatches.track[0].name} ${data.results.trackmatches.track[0].artist}"href="#"><i class="fab fa-youtube"></i> Play YouTube video</a> <br>
                         <a id="shareCommunity" class="${data.results.trackmatches.track[0].name} ${data.results.trackmatches.track[0].artist}"href="#"><i class="fas fa-share-alt"></i> Share with community</a>
                         </div>
                    </li>  
            `)
            $("#resultsArea").html("")
        })
    }
}


$(document).on("click", "#playYoutube", function(){
    $(".carousel").html("")
})


if (localStorage.getItem("favoriteImage")) {
    var arrayOfImgs = JSON.parse(localStorage.getItem("favoriteImage"));
    for (let i = 0; i < arrayOfImgs.length; i++) {
        
        console.log(arrayOfImgs[i])
        $(".carousel").append(`
        <a class="carousel-item" href="#one!"> <img src="${arrayOfImgs[i]}"> </a>
        `)
        $('.carousel-item').first().addClass('active');
    }
    $(".carousel").carousel();

}

var title = "";
var artist = "";

$(document).on("click", "#playYoutube", function () {
    var search = $(this).attr("class")
    var songInfo = $(this).parent().parent().text();
    var songInfoSplit = songInfo.split("Play");
    var justSongInfo = songInfoSplit[0].trim();
    var titleArtist = justSongInfo.split("-");
    console.log(titleArtist);
    title = titleArtist[0];
    artist = titleArtist[1];
    youtubeCall(search)
    lyricsCall();
})

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

function lyricsCall() {
    var queryURL = "https://orion.apiseeds.com/api/music/lyric/" + artist + "/" + title + "?apikey=dc5zX5sbKhjid5nFwa1slg1TQ9Cz2eAC1QbtW7KHL7SHSu84gHT1II8tLSylhRQk ";

    $.ajax({
        url: queryURL,
        method: 'GET',
        crossDomain: true
    }).then(function (response) {
        var lyrics = response.result.track.text;
        var formatLyrics = lyrics.replace(/\n/ig, '<br/>');
        console.log(formatLyrics);
        $("#lyrics-result").html("<h5>" + artist + "-" + title + " Lyrics</h5>" + formatLyrics);
    });
}

if (localStorage.getItem("commImage")) {
    var array = JSON.parse(localStorage.getItem("commImage"));
 }
 else {
    array = [];
 }
 
 $(document).on("click", "#shareCommunity", function () {
    Materialize.toast('Added to Community', 2000, "blue");
    var commImage = $(this).parent().parent().children().find("img").attr("src");
    console.log(commImage);
    if (array.indexOf(commImage) === -1) {
        array.push(commImage);
        localStorage.setItem("commImage", JSON.stringify(array))
    }
 })


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
    reactions: [],
    song:songName
  });
});

