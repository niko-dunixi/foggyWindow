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
        
      //$('<td />').width('5px').text(value.publicKey).appendTo(friendTable);
    
    //make table rows selectable
    $( "#rdFriendTable" ).change(function(){
        
        var selected = $(this).find('option:selected'); 
        var name = selected.val();
        var email = selected.attr('data-original-title');
        var publicKey = selected.attr('rsapublickey');
        
        console.log("name: " + name);
        console.log("email: " + email);
        console.log("key: " + publicKey);
        friend_name = name;
        friend_rsa_object = publicKey;
        friend_email = email;
        
      /*
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
      */
    });
  });
 
}