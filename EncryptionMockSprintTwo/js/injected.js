if(top.document != document) { //Stop. We only want to work in the main document, not in any embeded iframes.
  console.log("This is an iframe. Aborted.");
  return;
} else {
  console.log("Environment safe to continue.");
}

var panelCreated = false; //obvious boolean is obvious.
var panel = false; //Initialize to empty JQuery object. This is where the panel will be housed
var personal_rsa_object = undefined; //set and access this object for our own personal RSA keys
var friend_rsa_object = undefined; //set and access this for our friends

//Moving the ajax request lines to the part of the file that waits for the DOM to be ready.

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

  //add button listeners
  $('#addFriend').bind('click', addNewFriendDialog);
  $('#rdsSelectFriend').bind('click', addSelectFriendDialog);
  $('#setPass').bind('click', addSetPasswordDialog);

  

  console.log("inside create panel")
  
  $('#dummyEncryptionPanel').slideDown(0, function(){
    panel.slideDown();
  });
  panelCreated = true;
  
  console.log('added friend listener');
}

function destroyPanel(){
  
  //panel = undefined;
  //$(panel).hide();

  panel.slideUp(2, function(){
    $('#dummyEncryptionPanel').slideUp();
  });
  panelCreated = false;
}

function encryptDecrypt()
{
  var textInput = $('#textInput').val();
  if(/!!/i.test(textInput))
  {
    try{
      $('#transformed').text(cryptico.decrypt(textInput, personal_rsa_object));
    } catch (error){
      $('#transformed').text("Please set a Secret Passphrase.");
      console.log("invalid private key");
    }
  }
  else
  {
    try{
      $('#transformed').text(cryptico.encrypt(textInput, friend_rsa_object).cipher);
    } catch (error){
      $('#transformed').text("Please select a friend's key.");
      console.log("invalid public key");
    }
  }
}

function sendEmail(to, subject, body){
  var w = window.open("mailto:" + encodeURIComponent(to) + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body));
  //setTimeout(function(){w.close()}, 150);
}

function fillInitializer(){
  fillUpdate()
  window.addEventListener("hashchange", function() {
    fillUpdate();
  }, false);
  $('#fillButton').bind('click', function(){
    console.log("Test Click");
    var encryptedText = $('#transformed').text();
    switch (fillCheckUrl())
    {
      case "gmail":
        $('div[aria-label="Message Body"]').text(encryptedText);
        break;
      case "facebook":
        $('textarea[name="message_body"]').val(encryptedText);
        break;
      case "hotmail":
        break;
      case "yahoo":
        break;
      case "guerrilla":
        break;
      case "privnote":
        break;
      case "sms4tor":
        break;
      case "hushmail":
        break;
      case "tormail":
        break;
      default:
        break;
    }
  });
}

function fillUpdate(){
  var check = fillCheckUrl();
  if (check){
    $('#fillButton')[0].disabled = false;
  } else {
    $('#fillButton')[0].disabled = true;
  }
  return check;
}

function fillCheckUrl(){
  if (/^https:\/\/mail\.google\.com\/.*compose=new$/i.test(window.location)) {
    return "gmail";
  } else if (/^https:\/\/www\.facebook\.com\/messages\/.+(?!\/.*)/i.test(window.location)){
    return "facebook";
  /*} else if (/^https:\/\/blu\d+.mail.live.com\/.+n=\d+&view=1$/i.test(window.location)){ //working on other parts of project. There is no time to attempt these.
    return "hotmail";
  } else if (/^http:\/\/\w{2}-\w{3}\.mail\.yahoo\.com\/.*$/i.test(window.location)){
    return "yahoo";
  } else if (/^https:\/\/www\.guerrillamail\.com\/compose\/$/i.test(window.location)){
    return "guerrilla";
  } else if (/^https:\/\/privnote\.com\/?$/i.test(window.location)){
    return "privnote";
  } else if (/^http:\/\/sms4tor3vcr2geip\.onion\/?/i.test(window.location)){
    return "sms4tor";
  } else if (/^https:\/\/www\.hushmail\.com\/.*#compose$/i.test(window.location)){
    return "hushmail";
  } else if (/^http:\/\/jhiwjjlqpyawmpjx\.onion\/$/i.test(window.location)) { //This is only here for memorial purposes.
    return "tormail"; */
  } else {
    return false;
  }
}

// The injected script's message listener. I am unsure if this will have to be edited to
// accomodate different messages being passed to/from the background page or if there can
// multiple instances thereof. EG see commended else-if case below.
$(document).ready(function(){

  $.ajax({
    url:chrome.extension.getURL('injection.html'),
    success:function(data){
      panel = $(data);
      $('body').css('margin', '0px').css('padding', '0px').width('100%');
      panel.insertBefore($('body').children().first());
      $('<div>&nbsp;</div>').attr('id', 'dummyEncryptionPanel').css('position', 'relative').css('display', 'none').height(panel.height()).insertBefore($('body').children().first());
      $('#textInput').keyup(encryptDecrypt);
      fillInitializer();
    },
    dataType:'html'
  });
  
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    console.log(request);
    if (request.name == "toggle"){
      togglePanel();
    } /*else if (request.name == "load_friends"){
    
    }*/
    
    console.log("recieved response: " + request.name);
    sendResponse({result: "confirmed"});
  });
  console.log("Listener Initiated.");
});