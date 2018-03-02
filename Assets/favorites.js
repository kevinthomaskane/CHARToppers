
var arrayOfFavs = [];
if (localStorage.getItem("playlistSong")){
    arrayOfFavs = JSON.parse(localStorage.getItem("playlistSong"));
    console.log(arrayOfObjects)
    arrayOfObjects.forEach(addItems)
}

function createChips(){
    
}