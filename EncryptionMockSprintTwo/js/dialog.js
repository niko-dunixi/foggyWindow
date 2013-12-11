//there was a problem getting the images to load properly..
//Thank you mr PAEz
//http://stackoverflow.com/questions/13669762/chrome-extention-using-jquery-in-content-script-resolve-error-when-creating-dial

var dialogEffectDurration = 500;
var dialogZindex = 99949;

//adds the html of the dialog to the page. This should be removed at a later time.
function addBasicDialogHtml()
{
  $('body').append('<div id="dialog" title="Add Friend"><p>This is the mock dialog for adding a friend</p></div>');
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

function addNewFriendHtml()
{
  var div = $('<div />').attr('title', 'Add a new friend').attr('id', 'add-friend-dialog-form').css('zIndex', 9009 ).addClass('rgdpstksDialog').appendTo('body');
  var validatTips = $('<p />').text('Please fill out the entire user form. Note: Email is optional!').addClass("validateTips").appendTo(div);
  
  var form = $('<form />').appendTo(div);
  
  //name
  var name = $('<label />').text('Name').css('display', 'block').appendTo(form);
  var nameInput = $('<input />', {type: 'text', name: 'name', id: 'name', 'class': 'text ui-widget-content ui-corner-all'}).text('Enter name').css('display', 'block').appendTo(form);
  
  //email
  var email = $('<label />').text('Email (optional)').css('display', 'block').appendTo(form);
  var emailInput = $('<input />', {type: 'text', name: 'email', id: 'email', 'class': 'text ui-widget-content ui-corner-all'}).css('display', 'block').appendTo(form);
  
  //publicKey
  var publicKey = $('<label />').text('Public key of Friend').css('display', 'block').appendTo(form);
  var publicKeyTextarea = $('<textarea />', {type: 'text', name: 'publicKey', id: 'publicKey', 'class': 'text ui-widget-content ui-corner-all'}).attr('placeholder', 'Public Key').css('display', 'block').appendTo(form);
  
  //allFields = $( [] ).add( nameInput ).add( emailInput ).add( publicKeyTextarea ),
}

function addBasicPopDialog()
{
  $('#dialog').dialog();
}

//this came from http://jqueryui.com/dialog/#modal-form
function initAddFriendForm() {
  var name = $( "#name" ),
    email = $( "#email" ),
    publicKey = $( "#publicKey" ),
    allFields = $( [] ).add( name ).add( email ).add( publicKey ),
    tips = $( ".validateTips" );

  function updateTips( t ) {
    tips
      .text( t )
      .addClass( "ui-state-highlight" );
    setTimeout(function() {
      tips.removeClass( "ui-state-highlight", 1500 );
    }, 500 );
  }

  function checkLength( o, n, min, max, required) {
    //special case to check if the value is required or if the value is greater then zero
    if( (required) || (o.val().length))
    {    
      console.log("length of field: " + o.val().length);
      
      if ( o.val().length > max || o.val().length < min ) {
        o.addClass( "ui-state-error" );
        updateTips( "Length of " + n + " must be between " +
          min + " and " + max + "." );
        return false;
      } else {
        return true;
      }
    }
    
    //if the value is not required 
    //and there is no input 
    return true;
  }

  function checkRegexp( o, regexp, n, required) {
    //only perform check if there is a value entered in for the optional field
    if( (required) || (o.val().length))
    { 
      if ( !( regexp.test( o.val() ) ) ) {
        o.addClass( "ui-state-error" );
        updateTips( n );
        return false;
      } else {
        return true;
      }
    }
    
    //if the value is not required 
    //and there is no input 
    return true;
    
  }
  
  $('#add-friend-dialog-form').dialog({
    autoOpen: false,
    height: 450,
    width: 450,
    modal: true,
    show: {
        effect: "blind",
        duration: dialogEffectDurration,
    },
    hide: {
        effect: "blind",
        duration: dialogEffectDurration,
    },
    buttons: {
      "Add new friend": function() {
        var bValid = true;
        allFields.removeClass( "ui-state-error" );
        
        //this defines if the field is valid, and is between a specific length
        //ex. Name has to be between 3 and 16 digits
        bValid = bValid && checkLength( name, "username", 3, 16, true );
        bValid = bValid && checkLength( email, "email", 6, 80, false );
        //bValid = bValid && checkLength( publicKey, "publicKey", 5, 16, true);
        
        //regex for field validations
        bValid = bValid && checkRegexp( name, /^[a-zA-Z]([0-9a-zA-Z_\s])+$/i, "Username may consist of a-z, 0-9, underscores, begin with a letter.", true);
        // From jquery.validate.js (by joern), contributed by Scott Gonzalez: http://projects.scottsplayground.com/email_address_validation/
        bValid = bValid && checkRegexp( email, /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i, "eg. ui@jquery.com", false);
        
        //not sure what validation should occur for the private key
        //bValid = bValid && checkRegexp( publicKey, /^([0-9a-zA-Z])+$/, "Password field only allow : a-z 0-9" , true);

        //bValid = bValid && /^-----PUBLIC-RSA-KEY-----(.+)-----PUBLIC-RSA-KEY-----$/i.test(publicKey.val());
        bValid = bValid && checkRegexp( publicKey, /^-----PUBLIC-RSA-KEY-----(.+)-----PUBLIC-RSA-KEY-----$/i, "This should start and end with '-----PUBLIC-RSA-KEY-----'.", true);

        if ( bValid ) {
        
          //This is where the logic will go to add a new user
          console.log("Adding a new friend '" + name.val() + "' with email of '" + email.val() + "' and public key of '" + publicKey.val() + "'");
          
          pKey = /^-----PUBLIC-RSA-KEY-----(.+)-----PUBLIC-RSA-KEY-----$/i.exec(publicKey.val())[1]; //strip off the extra text that is not needed.

          //var newFriendStore = new Array();
          //newFriendStore.push({'name': name.val(), 'email': email.val(), 'publicKey': pKey});
          storeNewFriend(name.val(), email.val(), pKey);
          
          //destroy the dialog box, including the html
          $( this ).dialog( "close" );
          $("#add-friend-dialog-form").remove();
        }
      },
      Cancel: function() {
        $( this ).dialog( "close" );
        //deleteFriends();
      }
    },
    close: function() {
      allFields.val( "" ).removeClass( "ui-state-error" );
      console.log("removed friend html");
      $("#add-friend-dialog-form").remove();
    }
  });
}

//stores new friends into the database
function storeNewFriend(name, email, publicKey)
{
  console.log("Stored new friend..");
  var msgPort = chrome.runtime.connect({name: "load_friends"});
  msgPort.postMessage({});
  
  msgPort.onMessage.addListener(function(msg) {
    var friends = msg.keys;
    var newFriendStore = new Array();
    var friendsJson;
    try {
      friendsJson = JSON.parse(friends);
    } catch(e) {
      console.log("error while parsing: " + e);
      friendsJson = "";
    }
    console.log('response: ' + friendsJson);
    
    //add existing friends to list
    $.each(friendsJson, function(key, value){
      //console.log("key" + key);
      //console.log("value: " + value);
      newFriendStore.push({'name': value.name, 'email': value.email, 'publicKey': value.publicKey});
    });
    
    //add new friend to the list
    newFriendStore.push({'name': name, 'email': email, 'publicKey': publicKey});
    
    var newFriendStoreString = JSON.stringify(newFriendStore);
    console.log("json to send:" + newFriendStoreString);
    
    //send the new friends list to be stored
    chrome.runtime.connect({name : 'save_friends'}).postMessage({keys: newFriendStoreString});
    console.log("Stored new friend successfully");
  });
  

}

function deleteFriends()
{
   chrome.runtime.connect({name : 'save_friends'}).postMessage({keys: ""});
}

function addNewFriendDialog()
{
  addNewFriendHtml();
  initAddFriendForm();
  $( "#add-friend-dialog-form" ).zIndex(dialogZindex).dialog( "open" );
}


function loadFriends()
{

  var msgPort = chrome.runtime.connect({name: "load_friends"});
  msgPort.postMessage({});
  
  msgPort.onMessage.addListener(function(msg) {
    var friends = msg.keys;
    console.log('response: ' + friends);
    parseFriends(friends);
  });   
}

function loadFriendTable()
{
  var msgPort = chrome.runtime.connect({name: "load_friends"});
    msgPort.postMessage({});
  
  msgPort.onMessage.addListener(function(msg) {
    var friendsJson = msg.keys;
    console.log('response: ' + friendsJson);
    
    var friendsParsed = JSON.parse(friendsJson);
    console.log('parsed friends json ' + friendsParsed);
    $.each(friendsParsed, function(key, value){
      console.log("key" + key);
      console.log("value: " + value);
      
      //add table html
      var tr = $('<tr />');
      $('<td />').text(value.name).appendTo(tr);
      $('<td />').text(value.email).appendTo(tr);
      $('<td />').width('5px').text(value.publicKey).appendTo(tr);
      
      tr.appendTo($('#select-friend-table'));
    });
    
    //make table rows selectable
    $( "#select-friend-table tbody" ).selectable({
      stop: function() {
        $( "tr.ui-selected td", this ).each(function() {
          console.log("Selected " + $(this).last().text());
        });
        
        var publicKey = $( "tr.ui-selected td", this ).last().text();
        var selectedFriendName = $( "tr.ui-selected td", this ).first().text();
        $( "#select-result" ).text("Selected friend " + selectedFriendName);
        //console.log('publicKey ' + publicKey);
        //console.log('friendName ' + selectedFriendName);
        
        $('#rdsSelectedFriend').text(selectedFriendName);
        friend_rsa_object = publicKey;
        console.log($( "tr.ui-selected td", this ).first().next());
        friend_email = $( "tr.ui-selected td", this ).first().next().text(); //grabs the email string.
        
      }
    });
  });
 
}

function parseFriends(friendsJson)
{
  
}



function addSelectFriendHtml()
{
  var div = $('<div />').attr('title', 'Select a friend').attr('id', 'select-friend').addClass('rgdpstksDialog').appendTo('body');
  var validatTips = $('<p />').attr('id', 'select-result').text('Select your friend').appendTo(div);
  
  var table = $('<table />').width("100%").attr('id', 'select-friend-table').appendTo(div);
  var trFriend = $('<th />').width("33%").text("Friend").appendTo(table);
  var trEmail = $('<th />').width("33%").text("Email").appendTo(table);
  var trEmail = $('<th />').width("30px").text("Public Key").appendTo(table);
  
  
  //this is already done - brent.
  //Almost exactly what we need, but not quite. Sorry. I'm gunna put a hack-saw to your code. - Paul
  //PS, if you did actually make this clickable later, but didn't commit it let me know and we'll set it back
  //to what you wrote.
  
  
  
  /*var table = $('<table />').width("100%").attr('id', 'select-friend-table').appendTo(div);
  var trFriend = $('<th />').width("33%").text("friend").appendTo(table);
  var trEmail = $('<th />').width("33%").text("email").appendTo(table);
  var trEmail = $('<th />').width("33%").text("publicKey").appendTo(table);*/
  
  /*
  var table = $('<select />').width('100%').attr('id', 'select-friend-table').attr('size', '10').appendTo(div);
  table.bind('change', function(){
    var chosenFriend = table.find(':selected'); //The Chosen One.
    friend_email = chosenFriend.data('email');
    friend_rsa_object = chosenFriend.data('publicKey');
    console.log(friend_rsa_object); //should be just a string.
  });
  */
}

function initSelectFriendDialog()
{
$('#select-friend').dialog({
    autoOpen: false,
    height: 450,
    width: 450,
    modal: true,
    show: {
        effect: "blind",
        duration: dialogEffectDurration,
    },
    hide: {
        effect: "blind",
        duration: dialogEffectDurration,
    },
    buttons: {
      "Ok": function() {
        $( this ).dialog( "close" );
      }
    },
    close: function() {
      $("#select-friend").remove();
    }
  });
}

function addSelectFriendDialog()
{
  addSelectFriendHtml();
  initSelectFriendDialog();
  $( "#select-friend" ).zIndex(dialogZindex).dialog( "open" );
  loadFriendTable();
}




function addSetPasswordHtml()
{
  var div = $('<div />').attr('title', 'Set Your Secret Passphrase').attr('id', 'set-passphrase').appendTo('body');
  var validatTips = $('<div />').text('Create a passphrase ').appendTo(div);
  var form = $('<form />').appendTo(div);
  var fieldSet = $('<fieldset />').appendTo(form);
  var password = $('<input />', {type: 'password', name: 'password', id: 'dpstxpassword', 'class': 'text ui-widget-content ui-corner-all'}).width('100%').appendTo(fieldSet);

}

function initSetPasswordDialog()
{
$('#set-passphrase').dialog({
    autoOpen: false,
    height: 200,
    width: 450,
    modal: true,
    show: {
        effect: "blind",
        duration: dialogEffectDurration,
    },
    hide: {
        effect: "blind",
        duration: dialogEffectDurration,
    },
    buttons: {
      "Cancel": function(){
        $( this ).dialog( "close" );
      },
      "Set": function(){
        //Add password setting functionality here
        personal_rsa_object = cryptico.generateRSAKey($('#dpstxpassword').val(), 2048);
        $( this ).dialog( "close" );
      },
      "Set and Share": function(){
        //Add password setting functionality here
        personal_rsa_object = cryptico.generateRSAKey($('#dpstxpassword').val(), 2048);
        sendEmail("", "My Public RSA Key", "-----PUBLIC-RSA-KEY-----" + cryptico.publicKeyString(personal_rsa_object) + "-----PUBLIC-RSA-KEY-----");
        $( this ).dialog( "close" );
      }
    }, 
    close: function(){
      $("#set-passphrase").remove();
    }
  });
}

function addSetPasswordDialog()
{
  addSetPasswordHtml();
  initSetPasswordDialog();
  $( "#set-passphrase" ).zIndex(dialogZindex).dialog( "open" );
}
