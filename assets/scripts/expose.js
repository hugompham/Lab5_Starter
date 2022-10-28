// expose.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  // Dropdown select changes image and audio files according to selected horn
  document.getElementById('horn-select').addEventListener('change', (event) => {
  const imageHorn = document.querySelector("img");
  const soundHorn = document.querySelector("audio");
  switch(event.target.value){
    case "air-horn":
      imageHorn.src = "assets/images/air-horn.svg";
      soundHorn.src = "assets/audio/air-horn.mp3";
      break;
    case "car-horn":
      imageHorn.src = "assets/images/car-horn.svg";
      soundHorn.src = "assets/audio/car-horn.mp3";
      break;
    case "party-horn":
      imageHorn.src = "assets/images/party-horn.svg";
      soundHorn.src = "assets/audio/party-horn.mp3";
      break;
    }
  });

  // Change volume of slider changes icon and audio volume
  document.getElementById('volume').addEventListener('change', (event) => {
    const volumeIcon = document.querySelector("div > img");
    const volumeAudio = document.querySelector("audio");
    if (event.target.value == 0){
      volumeIcon.src = "assets/icons/volume-level-0.svg";
    }
    else if (event.target.value == 1 || event.target.value < 33){
      volumeIcon.src = "assets/icons/volume-level-1.svg";
    }
    else if (event.target.value == 33 || event.target.value < 67){
      volumeIcon.src = "assets/icons/volume-level-2.svg";
    }
    else if (event.target.value >= 67){
      volumeIcon.src = "assets/icons/volume-level-3.svg";
    }
    volumeAudio.volume = event.target.value/100;
  });

  // Click play button to play audio and confetti
  const jsConfetti = new JSConfetti();
  document.querySelector('button').addEventListener('click', (event) => {
    let audio = document.querySelector('audio');
    audio.play();
    jsConfetti.addConfetti();
  });
}