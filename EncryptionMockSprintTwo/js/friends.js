chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.greeting == "hello")
      sendResponse({farewell: "goodbye"});
    
    if (request.friends == "populate")
    {
      populateFriendsTable();
      sendResponse({friends: "Recieved and populated"});
    }
});

function populateFriendsTable()
{

  var options = $("#rdFriendTable option");
  console.log("options size: " + options.length);
  options.each(function(key, value)
    {
      $(this).remove();
      console.log("remove value");
    }
  );
  
  
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
      $('<option />').text(value.name).appendTo($('#rdFriendTable'));
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