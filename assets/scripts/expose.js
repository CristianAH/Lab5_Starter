// explore.js

window.addEventListener('DOMContentLoaded', init);

var talk;
var but;
const synth = window.speechSynthesis;
var voices = [];
var currVoice;

function init() {
  // TODO
  loadVoices();
}

function loadVoices()
{
  voices = synth.getVoices();

  if(voices.length === 0)
  {
    setTimeout(function(){ loadVoices(); }, 1000);
  }
  else
  {
    for (let i = 0; i < voices.length; i++)
    {
      const option = document.createElement('option');
      option.textContent = `${voices[i].name} (${voices[i].lang})`;

      
      option.setAttribute('data-lang', voices[i].lang);
      option.setAttribute('data-name', voices[i].name);
      document.getElementById("voice-select").appendChild(option);
     }
    talk = document.getElementById('voice-select');
    but = document.querySelector("button");
    but.addEventListener('click', pressTalk);
    talk.addEventListener('change', voiceChange);
    
    console.log('DOM fully loaded and parsed');
  }
}

function pressTalk()
{
  if(currVoice == null)
  {
    alert("Voice is not selected!");
  }
  else
  {
    var inputText = document.getElementById("text-to-speak").value;
    const utterance1 = new SpeechSynthesisUtterance(inputText);
    utterance1.voice = voices[currVoice];
    synth.speak(utterance1);
    document.querySelector("#explore img").src = "assets/images/smiling-open.png";
    document.querySelector("#explore img").alt = "Talking face";
    checkSpeaking();
  }
}
function checkSpeaking()
{
  if(synth.speaking)
  {
    setTimeout(function(){ checkSpeaking(); }, 100);
  }
  else
  {
    document.querySelector("#explore img").src = "assets/images/smiling.png";
    document.querySelector("#explore img").alt = "Smiling face";
  }
}

function voiceChange()
{
  for(var i = 0; i < voices.length; i++)
  {
    if(talk.value == `${voices[i].name} (${voices[i].lang})`)
    {
      currVoice = i;
      break;
    }
  }
}
