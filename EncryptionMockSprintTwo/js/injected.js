if(top.document != document) { //Stop. We only want to work in the main document, not in any embeded iframes.
  console.log("This is an iframe. Aborted.");
  return;
} else {
  console.log("Environment safe to continue.");
}

var panelCreated = false; //obvious boolean is obvious.
var panel = false; //Initialize to empty JQuery object. This is where the panel will be housed
//var personal_rsa_object = undefined; //set and access this object for our own personal RSA keys
var personal_public_key = "";
var friend_rsa_object = undefined; //UPDATE!!!! This is just a string. We don't generate an RSA object with public key strings, we just use the string.
var friend_email = ""; //changed this from intializing undefined to an empty string. This is to avoid sending "undefined" as the recipient.
var friend_name = "";

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

function authenticate_user()
{
  var authenticate_panel = $('#authenticatePanel');
  //personal_rsa_object = cryptico.generateRSAKey($('#dpstxpassword').val(), 2048);
  
  authenticate_panel.css('top','-300px');
}

function new_user()
{
  if ($('#dpstxpassword').val().length >= 9){
    $('#dpstxpassword').closest("div").removeClass('has-error');
    $('#auth_form').css('display', 'none');
    $('#auth_load').css('display', 'block');
    
    /*
    setTimeout(function(){
      personal_rsa_object = cryptico.generateRSAKey($('#dpstxpassword').val(), 2048);
      authenticate_user();
    }, 350);
    */
    //set rsa key though background
    var setKey = chrome.runtime.connect({name: "set_rsa_key"})
    console.log('set new rsa key');
    setKey.postMessage({setKey: $('#dpstxpassword').val()});  

    setKey.onMessage.addListener(function(msg) {
      console.log('new public key: '  + msg.key);
      personal_public_key = msg.key;
      authenticate_user();
    });
  } else {
    $('#dpstxpassword').closest("div").addClass('has-error');
    $('#dpstxpassword').focus();
  }
}

function shareKey()
{
  
  $('#shareKeyModal').modal('show');
  //console.log(cryptico.publicKeyString(personal_rsa_object));
  //$('#private_key_text').text("-----PUBLIC-RSA-KEY-----" + cryptico.publicKeyString(personal_rsa_object) + "-----PUBLIC-RSA-KEY-----");
  $('#private_key_text').text("-----PUBLIC-RSA-KEY-----" + personal_public_key + "-----PUBLIC-RSA-KEY-----");
  //sendEmail("", "My Public RSA Key", "-----PUBLIC-RSA-KEY-----" + cryptico.publicKeyString(personal_rsa_object) + "-----PUBLIC-RSA-KEY-----");
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
  //$('#addFriend').bind('click', addNewFriendDialog);
  //$('#rdsSelectFriend').bind('click', addSelectFriendDialog);
  //$('#setPass').bind('click', addSetPasswordDialog);
  $('#createNewFriend').click(createNewFriend);
  $('#removeFriend').click(function()
  {
    console.log('remove friend');
    storeNewFriend(friend_name, friend_email, '', 'delete')
  });
  //$('#authenticate_button').click(authenticate_user);
  $('#set_new_key_button').click(new_user);
  $('#shareKey').click(shareKey);
  $('#sharekeycopy').bind('click', function(){
    chrome.runtime.connect({name : 'copy'}).postMessage({clipboard: $('#private_key_text').text()});
  });
  
  
  var getKey = chrome.runtime.connect({name: "get_rsa_key"})
  getKey.postMessage({});
  
  getKey.onMessage.addListener(function(msg) {
    console.log('rsa key: '  + msg.key);
    if(msg.key == 'null')
    {    
      $('#dpstxpassword').keyup(function (e) {
        if (e.keyCode == 13) {
          new_user();
        }
      });
    }
    else
    {
      personal_public_key = msg.key;
      authenticate_user()
    }
  });
  

  console.log("inside create panel")
  

  $('#dummyEncryptionPanel').slideDown();
  panel.slideDown();
  panelCreated = true;
  
}

function destroyPanel(){
  
  //panel = undefined;
  //$(panel).hide();

  /*
  panel.slideUp(2, function(){
    $('#dummyEncryptionPanel').slideUp();
  });
  */
  panel.slideUp();
  
  $('#dummyEncryptionPanel').slideUp();
  
  panelCreated = false;
  
  //destroy button listeners
  $('#addFriend').unbind('click', addNewFriendDialog);
  $('#rdsSelectFriend').unbind('click', addSelectFriendDialog);
  $('#setPass').unbind('click', addSetPasswordDialog);
}

function encryptDecrypt()
{
  var textInput = $('#textInput').val();
  console.log("keypress");
  if(/^.*-----RSA-CIPHERTEXT-----(.+)-----RSA-CIPHERTEXT-----.*$/i.test(textInput))
  {
    try{
      textInput = /^.*-----RSA-CIPHERTEXT-----(.+)-----RSA-CIPHERTEXT-----.*$/i.exec(textInput)[1];
      $('#transformed').text(cryptico.decrypt(textInput, personal_rsa_object).plaintext);
    } catch (error){
      $('#transformed').text("Please set a Secret Passphrase.");
      console.log("invalid private key");
    }
  }
  else
  {
    try{
      if (typeof friend_rsa_object == undefined || friend_rsa_object.length == 0){
        throw "No key set.";
      }
      $('#transformed').text("-----RSA-CIPHERTEXT-----" + cryptico.encrypt(textInput, friend_rsa_object).cipher + "-----RSA-CIPHERTEXT-----");
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
      case "gmailOne":
        $('div[aria-label="Message Body"]').text(encryptedText);
        break;
      case "gmailTwo":
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
        $('textarea[name="body"]').text(encryptedText);
        break;
      case "privnote":
        $('#id_body').text(encryptedText);
        break;
      case "sms4tor":
        break;
      case "hushmail":
        $('#compose-text_body').val(encryptedText);
        break;
      case "tormail":
        break;
      default:
        //chrome.extension.getBackgroundPage().execCommand('copy');
        //document.execCommand('copy');
        console.log("Copy has been clicked.");
        chrome.runtime.connect({name : 'copy'}).postMessage({clipboard: $('#transformed').text()});
        break;
    }
  });
}

function fillUpdate(){
  var check = fillCheckUrl();
  if (check){
    $('#fillButton').text("Fill");
  } else {
    $('#fillButton').text("Copy");
  }
  return check;
}

function fillCheckUrl(){
  if (/^https:\/\/mail\.google\.com\/.*compose=new$/i.test(window.location)) {
    return "gmailOne";
  } else if (/^https:\/\/mail.google.com\/mail\/.*(?:\?|&)view=cm.*$/i.test(window.location)){
    return "gmailTwo";
  } else if (/^https:\/\/www\.facebook\.com\/messages.*$/i.test(window.location)){
    return "facebook";
  /*} else if (/^https:\/\/blu\d+.mail.live.com\/.+n=\d+&view=1$/i.test(window.location)){ //working on other parts of project. There is no time to attempt these.
    return "hotmail";
  } else if (/^http:\/\/\w{2}-\w{3}\.mail\.yahoo\.com\/.*$/i.test(window.location)){
    return "yahoo";
  */
  } else if (/^https:\/\/www\.guerrillamail\.com\/compose\/?$/i.test(window.location)){
    return "guerrilla";
  } else if (/^https:\/\/privnote\.com\/?$/i.test(window.location)){
    return "privnote";
  //} else if (/^http:\/\/sms4tor3vcr2geip\.onion\/?/i.test(window.location)){
  //  return "sms4tor";
  } else if (/^https:\/\/www\.hushmail\.com\/.*#compose$/i.test(window.location)){
    return "hushmail";
  } else if (/^http:\/\/jhiwjjlqpyawmpjx\.onion\/$/i.test(window.location)) { //This is only here for memorial purposes.
    return "tormail"; /* */
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
      //console.log("panel " + $(data).height());
      $('body').css('margin', '0px').css('padding', '0px').width('100%');
      panel.css('z-index', 2147483647).insertBefore($('body').children().first()); //max z-index possible.
      
      //let the injected css and the slideDown/slideUp functions take care of the height
      //$('<div>&nbsp;</div>').attr('id', 'dummyEncryptionPanel').css('position', 'relative').css('display', 'none').height().insertBefore($('body').children().first());
      $('<div>&nbsp;</div>').attr('id', 'dummyEncryptionPanel').css('position', 'relative').css('display', 'none').insertBefore($('body').children().first());
      
      //$('#textInput').keyup(encryptDecrypt);
      $('#textInput').bind('input propertychange', function(){
        encryptDecrypt();
      });
      $('#sendButton').bind('click', function(){
        console.log("send button still works? (If you're seeing this, then yes.)");
        sendEmail(friend_email, " ", $('#transformed').text());
      });
      fillInitializer();
      $('#rdSendButton')[0].src = chrome.extension.getURL("images/send.png");
      $('#setkeyimage')[0].src = chrome.extension.getURL("images/key.png");
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
  
  //populate firends list. Can't call directly there because the elements can't be selected right off the bat
  //for some reason - bbarker
  chrome.runtime.connect({name: "populate_friends"}).postMessage({});
  chrome.runtime.connect({name: "inject_css"}).postMessage({});
  /*
  var getKey = chrome.runtime.connect({name: "get_rsa_key"})
  getKey.postMessage({});
  getKey.onMessage.addListener(function(msg) {
    console.log('rsa key: '  + msg.key);
  });
  
  //set rsa key
  var setKey = chrome.runtime.connect({name: "set_rsa_key"})
  setKey.postMessage({setKey: "hi"});  
  setKey.onMessage.addListener(function(msg) {
    console.log('set key response: '  + msg.key);
  });
  */
});