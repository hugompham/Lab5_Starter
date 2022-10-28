// explore.js

/* Declaring some important variables first */
// Array to store all voices 
let voices = []; 

// Grab a reference to the 'select' element
const voiceSelect = document.querySelector('select'); 

// Grab the speechSynthesis API
const synth = window.speechSynthesis; 

function populateVoices() {
  voices = synth.getVoices(); // Grab all voices and store to the array

  // For each voice in the array, we make an "option" out of it
  // then append to the 'select' element in explore.js
  for (let i = 0; i < voices.length ; i++) {
    const option = document.createElement('option');
    option.textContent = `${voices[i].name} (${voices[i].lang})`;

    if (voices[i].default) {
      option.textContent += ' — DEFAULT';
    }

    option.setAttribute('data-lang', voices[i].lang);
    option.setAttribute('data-name', voices[i].name);
    voiceSelect.appendChild(option);
  }
}

populateVoices(); // We load all available voices from the API
 
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoices;
}

// Grab a reference to the 'Press to Talk' button
const buttonClick = document.querySelector('button');

// Grab a reference to the textarea element
const textArea = document.getElementById('text-to-speak');

/* Upon finished loading */
window.addEventListener('DOMContentLoaded', init);

function init() {
  buttonClick.addEventListener('click', (event) => {
    const utterThis = new SpeechSynthesisUtterance(textArea.value);
    const selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');

    for (let i = 0; i < voices.length ; i++) {
      if (voices[i].name === selectedOption) {
        utterThis.voice = voices[i];
      }
    }
    
    utterThis.volume = 50;

    synth.speak(utterThis);
  });
}