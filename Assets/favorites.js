


if (localStorage.getItem("playlistSong")){
    var arrayOfFavs = JSON.parse(localStorage.getItem("playlistSong"));
    console.log(arrayOfFavs)
    for (let i = 0; i < arrayOfFavs.length; i++){
        var search = arrayOfFavs[i];
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
}



