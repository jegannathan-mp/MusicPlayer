import { songs } from "./playlist.js";

console.log(songs);


const content = document.querySelector(".cont-2");
const Playimage = content.querySelector(".play-img");
const musicName = content.querySelector(".head-title");
const musicArtist = content.querySelector(".art-name");
const Audio = document.querySelector("audio");
const prevBtn = content.querySelector("#backward");
const nextBtn = content.querySelector("#forward");
const playBtn = content.querySelector(".play-pause1");
const playBtnIcon = content.querySelector("#play");
const repeatBtn = content.querySelector("#repeat");
const shuffle = content.querySelector("#shuffle");
const muteButton = document.querySelector("#volume-unmute");
const timeRange = document.querySelector("#range");
const currentTimeDisplay = document.querySelector("#timer-in");


// console.dir(Playimage);
// console.log(Audio);
console.dir(Audio);
console.log(Audio);


let index = 1;

window.addEventListener("load", ()=>{
    loadData(index);
})

function loadData(indexValue){
    musicName.innerHTML = songs[indexValue -1].name;
    musicArtist.innerHTML = songs[indexValue - 1].artist;
    Playimage.src = songs[indexValue -1].img;
    Audio.src = songs[indexValue - 1].audio;
    // console.error(Audio.src)
}

let isPlaying = false;

playBtn.addEventListener("click", ()=> {
    // const isMusicPaused = content.classList.contains("paused");
    if(isPlaying){
        pauseSong()
    } else {
        playSong()
    }
});

function playSong(){
    isPlaying = true;
    playBtnIcon.classList.replace("fa-play", "fa-pause");
    Audio.play();
}

function pauseSong(){
    playBtnIcon.classList.replace("fa-pause", "fa-play");
    Audio.pause();
    isPlaying = false;
}






nextBtn.addEventListener("click", ()=> {
    nextSong();
})

prevBtn.addEventListener("click", () => {
    prevSong();
})

function nextSong(){
    index++;
    if(index > songs.length){
        index = 1;
    } else {
        index = index
    }
    loadData(index);
    playSong();
}

function prevSong(){
    index--;
    if(index <= 0){
        index = songs.length
    } else {
        index = index
    }
    loadData(index);
    playSong();
}

shuffle.addEventListener("click", ()=> {
    var randIndex = Math.floor(Math.random()*songs.length)+1;
    loadData(randIndex);
    playSong();
})


Audio.addEventListener("ended", ()=>{
    index++;
    if(index > songs.length){
        index = 1;
    }
    loadData(index);
    playSong();
})

function mute_unmute(){
    Audio.muted = !Audio.muted;

    if(Audio.muted){
        muteButton.textContent = " ❌";
    } else {
        muteButton.textContent = ""
    }
}

muteButton.addEventListener("click",mute_unmute);


//Update the value of the range input as the audio progresses
Audio.addEventListener("timeupdate", () => {
    const currentTime = Audio.currentTime;
    const duration = Audio.duration;
    const percentage = (currentTime / duration) * 100;
    timeRange.value = percentage;
    // console.log(percentage);
})

//Update the audio playback position when the range input is changed
timeRange.addEventListener("input", () => {
    const percentage = timeRange.value;
    const duration = Audio.duration;
    const currentTime = (percentage / 100) * duration;
    Audio.currentTime = currentTime;
})


repeatBtn.addEventListener("click", () => {
    Audio.currentTime = 0;
    Audio.play();
    Audio.loop != Audio.loop
})

Audio.addEventListener("timeupdate", ()=>{
    let currentTime = Math.floor(Audio.currentTime);
    let minutes = Math.floor(currentTime /60);
    let seconds =currentTime % 60;
    if (minutes < 10){
        minutes = "0"+minutes;
    }
    if (seconds < 10){
        seconds = "0"+seconds
    }
    let formatedTime = `${minutes} : ${seconds}`;
    currentTimeDisplay.textContent = `${formatedTime}`;
})


Audio.addEventListener("timeupdate", () => {
    let progress = (Audio.currentTime / Audio.duration) * 100;
    timeRange.value = progress;
});

timeRange.addEventListener("input", ()=>{
    let seekTime = (timeRange.value / 100)*Audio.duration;
    Audio.currentTime = seekTime;
})









