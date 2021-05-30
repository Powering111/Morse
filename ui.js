var settingExpanded=false;
function setting(){
  if(settingExpanded==false){
    document.getElementById("settings").style.maxHeight="1000px";
    settingExpanded=true;
  }else{
    document.getElementById("settings").style.maxHeight="0px";
    settingExpanded=false;
  }
}
