console.log("Welcome to My Music Player");

// Initialize Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

// Songs Array
let songs = [
    {songName: "Sunrise Beats", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Ocean Vibes", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "Calm Nights", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Fire in the Sky", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Dreamy Escapes", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Serene Journey", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "Blissful Tunes", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"},
    {songName: "Mystic Moods", filePath: "songs/8.mp3", coverPath: "covers/8.jpg"},
    {songName: "Ethereal Harmony", filePath: "songs/9.mp3", coverPath: "covers/9.jpg"},
    {songName: "Chasing Stars", filePath: "songs/10.mp3", coverPath: "covers/10.jpg"}
];

// Update song items with images and titles
songItems.forEach((element, i) => { 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
});

// Handle play/pause button click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        togglePlayPause(masterPlay, true);
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        togglePlayPause(masterPlay, false);
        gif.style.opacity = 0;
    }
});

// Listen to time updates and update the progress bar
audioElement.addEventListener('timeupdate', () => { 
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100); 
    myProgressBar.value = progress;
});

// Seek functionality
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});

// Reset all play buttons
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
};

// Handle individual song play
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => { 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        loadSong(songIndex);
        audioElement.play();
        gif.style.opacity = 1;
        togglePlayPause(masterPlay, true);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
    });
});

// Load song by index
const loadSong = (index) => {
    audioElement.src = songs[index].filePath;
    masterSongName.innerText = songs[index].songName;
    audioElement.currentTime = 0;
};

// Handle next button
document.getElementById('next').addEventListener('click', () => {
    songIndex = (songIndex >= songs.length - 1) ? 0 : songIndex + 1;
    loadSong(songIndex);
    audioElement.play();
    togglePlayPause(masterPlay, true);
    gif.style.opacity = 1;
});

// Handle previous button
document.getElementById('previous').addEventListener('click', () => {
    songIndex = (songIndex <= 0) ? songs.length - 1 : songIndex - 1;
    loadSong(songIndex);
    audioElement.play();
    togglePlayPause(masterPlay, true);
    gif.style.opacity = 1;
});

// Helper function to toggle play/pause icon
const togglePlayPause = (element, isPlaying) => {
    if (isPlaying) {
        element.classList.remove('fa-play-circle');
        element.classList.add('fa-pause-circle');
    } else {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    }
};
