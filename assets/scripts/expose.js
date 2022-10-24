// expose.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  // TODO
  document.getElementById('horn-select').addEventListener('change', (event) => {
  const imageHorn = document.querySelector("[type='img']");
  switch(event.target.value){
    case "air-horn":
      imageHorn.src = "air-horn.svg";
      break;
    case "car-horn":
      imageHorn.src = "car-horn.svg";
      break;
    case "party-horn":
      imageHorn.src = "party-horn.svg";
      break;
  }
  });
}