// expose.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  // TODO
  document.getElementById('horn-select').addEventListener('change', (event) => {
    const imageHorn = document.querySelector("img");
    const soundHorn = document.querySelector("audio")
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
}