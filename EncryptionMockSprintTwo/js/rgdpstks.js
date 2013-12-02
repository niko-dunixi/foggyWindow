if(top.document != document) { //Stop. We only want to work in the main document, not in any embeded iframes.
  console.log("This is an iframe. Aborted.");
  return;
} else {
  console.log("Environment safe to continue.");
}

var panelCreated = false;
var panel = $();

function togglePanel(){
  console.log("Toggling Panel");
  if (panelCreated == true){
    destroyPanel();
  } else {
    createPanel();
  }
  console.log("Status: " + panelCreated);
}

function createPanel(){
  
  
}

function destroyPanel(){
  panel.remove();
  panelCreated = false;
}

function sendEmail(body){
  var w = window.open("mailto:?&body="+encodeURIComponent(body));
  setTimeout(function(){w.close()}, 150);
}

$(document).ready(function(){
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    console.log(request);
    if (request.name == "toggle"){
      togglePanel();
      publKeys = request.publKeys;
    }
    sendResponse({result: "confirmed"});
  });
  console.log("Listener Initiated.");
});