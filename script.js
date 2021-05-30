var nowWriting,nowWritingTemp;
var nowChar="", morseDisplay;
var isUpper=true,upperCheck;
var unitTimeInput, unitTime = 150;
var d;
var startedTime, endTime;
var isKeying=false,isPlaying=false;
var display, sender,key;
var volumeInput,volume = 0.7;
var colorInput=new Array(4);
var color=['#FFFFFF','#FFFF00','#FFFFFF','#000000'];
var audioCtx=new(window.AudioContext || window.webkitAudioContext)();
var oscillator,audioGain;
var code={
                ".-": "a",
                "-...": "b",
                "-.-.": "c",
                "-..": "d",
                ".": "e",
                "..-.": "f",
                "--.": "g",
                "....": "h",
                "..": "i",
                ".---": "j",
                "-.-": "k",
                ".-..": "l",
                "--": "m",
                "-.": "n",
                "---": "o",
                ".--.": "p",
                "--.-": "q",
                ".-.": "r",
                "...": "s",
                "-": "t",
                "..-": "u",
                "...-": "v",
                ".--": "w",
                "-..-": "x",
                "-.--": "y",
                "--..": "z",
                "-----": "0",
                ".----": "1",
                "..---": "2",
                "...--": "3",
                "....-": "4",
                ".....": "5",
                "-....": "6",
                "--...": "7",
                "---..": "8",
                "----.": "9",
                ".-.-.-": ".",
                "--..--": ",",
                "---...": ":",
                "..--..": "?",
                ".----.": "'",
                "-....-": "-",
                "-..-.": "/",
                ".-..-.": '"',
                ".--.-.": "@",
                "-...-": "=",
                "---.": "!"
            };
var toUpper={"a":"A","b":"B","c":"C","d":"D","e":"E","f":"F","g":"G","h":"H","i":"I","j":"J","k":"K","l":"L","m":"M","n":"N","o":"O","p":"P","q":"Q","r":"R","s":"S","t":"T","u":"U","v":"V","w":"W","x":"X","y":"Y","z":"Z"};
function playsound() {
  if(isPlaying==false){

    audioGain=audioCtx.createGain();
    audioGain.connect(audioCtx.destination);
    audioGain.gain.value=volume;

    oscillator = audioCtx.createOscillator();
    oscillator.type = 'square';
    oscillator.frequency.value = 600;
    oscillator.connect(audioGain);
    oscillator.start();
    isPlaying=true;
  }
}
function stopsound(){
  if(isPlaying==true){
    oscillator.stop();
    isPlaying=false;
  }
}
function applyChar(){
  let c;
  if(isUpper){
    c=toUpper[code[nowChar]];
  }else{
    c=code[nowChar];
  }
  nowWriting.innerHTML += c || "";
  nowChar="";
  nowWritingTemp.innerHTML="";
}
function updateChar(){
  let c;
  if(isUpper){
    c=toUpper[code[nowChar]];
  }else{
    c=code[nowChar];
  }
  nowWritingTemp.innerHTML=c||"";
}
var keyStarted= false;

function keydown(){
  if(keyStarted==false){

    key.style.color=color[0];
    key.style.backgroundColor=color[1];
    playsound();
    d=new Date();
    endTime=d.getTime();
    let deltaTime = endTime - startedTime;
    if(deltaTime>unitTime*7){
      applyChar();
      nowWriting.innerHTML += '<br>';
      morseDisplay.innerHTML='';

    }
    else if(deltaTime>unitTime*3){
      applyChar();
      nowWriting.innerHTML += ' ';
      morseDisplay.innerHTML +=' ';
    }else if(deltaTime>unitTime){
      applyChar();
      morseDisplay.innerHTML +=' ';
    }
    startedTime=endTime;

    keyStarted=true;
  }
}
function keyup(){
  if(keyStarted==true){
    key.style.color=color[2];
    key.style.backgroundColor=color[3];
    stopsound();
    d=new Date();
    endTime=d.getTime();
    let deltaTime = endTime-startedTime;
    document.getElementById("debug").innerHTML="S: "+startedTime+", E: "+endTime+"<br>DT: "+deltaTime;
    if(deltaTime<unitTime){
      nowChar += '.';
      morseDisplay.innerHTML += '·';
    }else{
      nowChar += '-';
      morseDisplay.innerHTML += '-';
    }
    updateChar();
    keyStarted=false;
    startedTime=endTime;
  }
}
function colorChanged(obj, i){
  color[i]=obj.value;
}
document.addEventListener('DOMContentLoaded',function(){
  display = document.getElementById("display");
  key = document.getElementById("key");
  sender = document.getElementById("sender");
  volumeInput = document.getElementById("volume");
  unitTimeInput= document.getElementById("unitTime");
  nowWriting = document.getElementById("nowWriting");
  nowWritingTemp = document.getElementById("nowWriting_temp");
  morseDisplay=document.getElementById("morseDisplay");
  upperCheck=document.getElementById("upper");
  upperCheck.addEventListener('change',function(){
    isUpper=upperCheck.checked;
  });
  for(var i =0;i<4;i++){
    colorInput[i]=document.getElementById("color"+(i+1));
  }
  unitTimeInput.addEventListener('input',function(){
    unitTime=unitTimeInput.value;
    document.getElementById('unitTimeValue').innerHTML=unitTime+"ms";
  });
  window.addEventListener('keydown', (e)=>{
    if(e.key==' ')
    keydown();
  });
  window.addEventListener('keyup', (e)=>{
    if(e.key==' ')
    keyup();
  });
  key.addEventListener('mousedown',keydown);
  key.addEventListener('mouseup',keyup);
  key.addEventListener('touchstart',keydown);
  key.addEventListener('touchend',keyup);
  volumeInput.addEventListener('input',function(){
    volume=volumeInput.value;
    document.getElementById('volumeValue').innerHTML=Math.floor(volume*100)+"%";
  });


});
