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
    console.log('loading friends..');
    
    var friendsParsed = JSON.parse(friendsJson);
    //console.log('parsed friends json ' + friendsParsed);
    $.each(friendsParsed, function(key, value){
      //console.log("key" + key);
      //console.log("value: " + value);
      
      //populate friend table
      var friendTable = $('#rdFriendTable');
      var option = $('<option />').text(value.name)
        /*
        .attr({'data-placement' : 'right'})
        .attr({'data-original-title' : 'testing'})
        .addClass('tooltip').text(value.email)
        */
        .attr({'data-toggle' : 'tooltip'})        
        .attr({'title':value.email})
        .attr({'rsapublickey':value.publicKey})
        // /*
        //I can see the css changing, but tooltip dosen't display
        .tooltip({
          placement: 'right',
        })
        //*/
        .appendTo(friendTable);
    });
    console.log('Friends loaded');
  });
 
}