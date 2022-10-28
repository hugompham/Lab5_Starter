// explore.js

/* Declaring some important variables first */
// Array to store all voices 
let voices = []; 

// Grab a reference to the 'select' element
const voiceSelect = document.querySelector('select'); 

// Grab the speechSynthesis API
const synth = window.speechSynthesis; 

// Grab a reference to the 'Press to Talk' button
const buttonClick = document.querySelector('button');

// Grab a reference to the textarea element
const textArea = document.getElementById('text-to-speak');

// Grab a reference to the smiling face
const smileFace = document.querySelector('img');

// Function to populate the drop down list with voices
// available in the browser
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

/* Upon finished loading */
window.addEventListener('DOMContentLoaded', init);

function init() { 
  // Behavior: When there is an ongoing speech and the user clicks the button again, 
  // the new speech will be added to the queue, waiting for the ongoing speech 
  // to finish first.
  buttonClick.addEventListener('click', (event) => {
    event.preventDefault(); 
    
    // Create a new speech synthesizer object for the texts from the textbox
    const utterThis = new SpeechSynthesisUtterance(textArea.value);

    // Grab the selected voice from the drop down list
    const selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');

    // Loop over the voices array to compare and see which voice
    // the user selected. Then assign said voice to the object's 
    // voice property.
    for (let i = 0; i < voices.length ; i++) {
      if (voices[i].name === selectedOption) {
        utterThis.voice = voices[i];
      }
    }
    
    // We don't have dedicate sliders/buttons for these values, 
    // so we default them to 1
    utterThis.pitch = 1;
    utterThis.volume = 1;
    utterThis.rate = 1;

    // Queue the new speech
    synth.speak(utterThis);
    
    // Upon starting to speak, the smiling face will open its mouth
    utterThis.addEventListener('start', () => {
      smileFace.src = "assets/images/smiling-open.png";
    });

    // Once the speech is finished, reset back to smiling face
    // Bug: Up to 1 sec delay (depending on the voice) for the face
    // to reset back to smiling
    utterThis.addEventListener('end', () => {
      smileFace.src = "assets/images/smiling.png";
    });
  })
}