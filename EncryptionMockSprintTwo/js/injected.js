if(top.document != document) { //Stop. We only want to work in the main document, not in any embeded iframes.
  console.log("This is an iframe. Aborted.");
  return;
} else {
  console.log("Environment safe to continue.");
}

var panelCreated = false; //obvious boolean is obvious.
var panel = false; //Initialize to empty JQuery object. This is where the panel will be housed
var personal_rsa_object; //set and access this object for our own personal RSA keys
var friend_rsa_object; //set and access this for our friends

function encryptObject(pwd, obj){
  console.log(obj);
  return btoa(sjcl.encrypt(pwd, JSON.stringify(obj)));
}
function decryptObject(pwd, obj){
  console.log(obj);
  return JSON.parse(sjcl.decrypt(pwd, atob(obj)));
}

//these are passed to the page every time the toggle button is pressed, regardless of the current panel state. Hopefully this will help us keep from missing when a user adds or removes any given key.
var privKeys = "";
var publKeys = "";
//these declairations have been moved out of the method. I want to do as much as possible by reference. The reason is because the more ID's and classes we have  posted to the page when we inject, the more likely someone will write a script to detect our presense.
var ecSelect; 
var dcSelect;
//These are the actual cryptography objects. They are generated when there is a change to the selected key.
var ecBinder;
var dcBinder;


$.ajax({
  url:chrome.extension.getURL('injection.html'),
  success:function(data){
    panel = $(data);
    $('body').append(panel);
  },
  dataType:'html'
});
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
  //assign the resulting panel to the semi-global variable "panel" so it is accesible to the rest of the extension if need be (EG destruction)
  //panel = ;
  
  //These two lines add the html and launch the popup dialogs.
  //They can be deleted at a later time.
  //The javascript for these functions are located in js/dialog.js
  //addBasicDialogHtml();
  //addBasicPopDialog();
  //addNewFriendHtml();
  //addNewFriendDialog();
  console.log("inside create panel")
  
      panel.slideDown();
  panelCreated = true;
}

function destroyPanel(){
  
  //panel = undefined;
  //$(panel).hide();
  panel.slideUp();
  panelCreated = false;
}

function sendEmail(body){
  var w = window.open("mailto:?&body="+encodeURIComponent(body));
  setTimeout(function(){w.close()}, 150);
}


// The injected script's message listener. I am unsure if this will have to be edited to
// accomodate different messages being passed to/from the background page or if there can
// multiple instances thereof. EG see commended else-if case below.
$(document).ready(function(){
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    console.log(request);
    if (request.name == "toggle"){
      togglePanel();
    } /*else if (request.name == "load_friends"){

    }*/
    sendResponse({result: "confirmed"});
  });
  console.log("Listener Initiated.");
});