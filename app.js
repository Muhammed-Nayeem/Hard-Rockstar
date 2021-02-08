//Load Data by Calling API:
/*
const loadDataByAPI = (searchText) => {
  const searchURL = `https://api.lyrics.ovh/suggest/${searchText}`;
  fetch(searchURL)
    .then((response) => response.json())
    .then((songsData) => displaySongs(songsData.data));
};
*/
const loadDataByAPI = async (searchText) => {
  try {
    const searchURL = `https://api.lyrics.ovh/suggest/${searchText}`;
    const response = await fetch(searchURL);
    const songsData = await response.json();
    displaySongs(songsData.data);
  } catch (error) {
    showError(`Your entire data is not found at this moment! Please try again latter.`);
  }
};

//Search-Song-Button:
const searchSong = () => {
  const searchText = document.getElementById("type-song-name").value;
  //calling Function: loadDataByAPI()
  loadDataByAPI(searchText);
};

//Display Song:
const displaySongs = (songs) => {
  const songContainer = document.getElementById("song-container");
  songContainer.innerHTML = "";
  songs.forEach((song) => {
    const songItemsDiv = document.createElement("div");
    songItemsDiv.className = "single-result row align-items-center my-3 p-3";
    songItemsDiv.innerHTML = `
    <div class="col-md-9">
      <h3 class="lyrics-name">${song.title}</h3>
      <p class="author lead">Album by <span>${song.artist.name}</span></p>
      <audio controls>
        <source src="${song.preview}" type="audio/mpeg">
      </audio>
    </div>
    <div class="col-md-3 text-md-right text-center">
      <button onclick="getLyrics('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
    </div>
    `;
    songContainer.appendChild(songItemsDiv);
  });
};

//Get Song Lyrics:
const getLyrics = (artist, title) => {
  const lyricsURL = ` https://api.lyrics.ovh/v1/${artist}/${title}`;
  fetch(lyricsURL)
    .then((response) => response.json())
    .then((lyricsData) => displayLyrics(lyricsData.lyrics))
    .catch(error => showError(`Your entire data is not found at this moment! Please try again latter.`));
};
/*
const getLyrics = async (artist, title) => {
  const lyricsURL = ` https://api.lyrics.ovh/v1/${artist}/${title}`;
  const response = await fetch(lyricsURL);
  const lyricsData = await response.json();
  displayLyrics(lyricsData.lyrics);
};
*/
//Display Lyrics:
const displayLyrics = (lyrics) => {
  const lyricsContainer = document.getElementById("lyrics-showcase");
  lyricsContainer.innerText = lyrics;
};

//Display Error:
const showError = (error) => {
  const errorMessage = document.getElementById("E-Message");
  errorMessage.innerText = error;
};
