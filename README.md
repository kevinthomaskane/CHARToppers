# CharToppers

<p>This project was created using javascript, jQuery, Firbase, and localStorage.  On the home page, browse through songs compiled from the lastFM API.  If you like a song, add it to your favorites or share with the community.</p>

[View the deployed site here](https://kevinthomaskane.github.io/Project-1/)

<h3>How it works</h3>
<p>Each option on the main page triggers an AJAX call to the lastFM API.  If you click "watch youtube video", the song is automatically searched on the youtube API and the corresponding video will play.</p>

<h3>Favorites Section</h3>
<p>When you add a song to your "favorites", the song is saved in localStorage so you can access it anytime on your machine. </p>

<h3>Community Section</h3>
<p>Songs that are added to the community are saved in a Firebase database.  These songs are available on any machine.  When you "play youtube" from this page, a comment section will pop up along with the video.  These comments are updated in real-time using Firebase.</p>
