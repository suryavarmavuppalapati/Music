const songs = [
  {
    name: "Kudmayi",
    link: "https://paglasongs.com/files/download/id/14933",
    artists: "Shahid Mallya",
    image:
      "https://raw.githubusercontent.com/developergtm24/music-web/main/image%20musuic.jpg",
  },
  {
    name: "Tum Se",
    link: "https://pagalsongs.com.in/siteuploads/files/sfd3/1494/Tum%20Se-(PagalSongs.Com.IN).mp3",
    artists: "Sachin-Jigar",
    image:
      "https://raw.githubusercontent.com/developergtm24/music-web/main/image%20musuic.jpg",
  },
  {
    name: "Sooseki",
    link: "https://gaana.com/song/sooseki-from-pushpa-2-the-rule",
    artists: "Sachin-Jigar",
    image: "",
  },
];

var progress = document.querySelector("#progress");
var song = document.querySelector("#song");
var playBtn = document.querySelector("#play i");
var index = 0;
var img = document.querySelector(".img img");

var title = document.querySelector("#title");
var artist = document.querySelector("#musician");

var start = document.querySelector("#start");
var end = document.querySelector("#end");

function loadSong(songIndex) {
  console.log("Loading song:", songs[songIndex]); // Debugging
  song.src = songs[songIndex].link;
  title.innerHTML = songs[songIndex].name;
  artist.innerHTML = songs[songIndex].artists;
  img.src = songs[songIndex].image;

  song.onloadedmetadata = function () {
    progress.max = song.duration;
    end.innerHTML = formatTime(song.duration);
    console.log("Song metadata loaded:", song.duration); // Debugging
  };

  song.ontimeupdate = function () {
    progress.value = song.currentTime;
    start.innerHTML = formatTime(song.currentTime);
  };

  console.log("Song source set to:", song.src); // Debugging
  console.log("Title set to:", title.innerHTML); // Debugging
  console.log("Artist set to:", artist.innerHTML); // Debugging
  console.log("Image source set to:", img.src); // Debugging
}

function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min < 10 ? "0" : ""}${min}:${sec < 10 ? "0" : ""}${sec}`;
}

progress.onchange = function () {
  song.currentTime = progress.value;
  song.play();
  playBtn.classList.replace("bx-play", "bx-pause");
  img.classList.add("play");
};

function nextPlay() {
  index = (index + 1) % songs.length;
  loadSong(index);
  song.play();
  playBtn.classList.replace("bx-play", "bx-pause");
  img.classList.add("play");
}

function prevPlay() {
  index = (index - 1 + songs.length) % songs.length;
  loadSong(index);
  song.play();
  playBtn.classList.replace("bx-play", "bx-pause");
  img.classList.add("play");
}

playBtn.parentElement.addEventListener("click", function () {
  if (song.paused) {
    song.play();
    playBtn.classList.replace("bx-play", "bx-pause");
    img.classList.add("play");
  } else {
    song.pause();
    playBtn.classList.replace("bx-pause", "bx-play");
    img.classList.remove("play");
  }
});

document.querySelector("#next").addEventListener("click", nextPlay);
document.querySelector("#prev").addEventListener("click", prevPlay);

// Load the initial song
loadSong(index);
