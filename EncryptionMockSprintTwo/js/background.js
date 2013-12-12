var initialized = localStorage['initialized'];

if (typeof initialized == "undefined"){
	localStorage['initialized'] = true;
	localStorage['friends'] = JSON.stringify(new Array());
}

var rsaKey = "not_set";

//Chrome listener API. The connection between the injected script and the local storage + vice versa.
chrome.runtime.onConnect.addListener(function(port) {
	console.log('recieved message port ' + port.name);
	port.onMessage.addListener(function(msg) {
		//console.log('recieved message inside' + msg);
		switch (port.name){    
			
      //if the button is pressed, toggle is called and resent to the active tab.
			case 'toggle':
				console.log("Toggle Called.");
				try{
					chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
						chrome.tabs.sendMessage(tabs[0].id, {'name': 'toggle'}, function(response) {
							console.log(response.result);
						});
					});
				} catch (err){
					console.log(err.message);
				}
	
				break;
			
      //if the page sends the background script "load_friends", then we send it back the list of keys that we have.
			case 'load_friends':
				console.log("Friend keys requested");
        		port.postMessage({keys: localStorage['friends']});
        /*
				try{
					chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
						chrome.tabs.sendMessage(tabs[0].id, {'name': 'load_friends', 'keys': localStorage['friends']}, function(response) {
							console.log(response.result);
						});
					});
				} catch (err){
					console.log(err.message);
				}
      */
			//if we recieve the mesage "save_friends", then we also expect the JSON object to have a
			//port.keys value with ALL the user keys that we want to save for next time
			break;
			
      case 'save_friends':
				console.log("Friend keys recieved" + msg.keys);
				try{
					localStorage['friends'] = msg.keys;
				} catch (err){
					console.log(err.message);
				}
			break;
			
      //populate the friends list on the main panel
      case 'populate_friends':
	        //init friends table
	        //I can't bind the buttons inside of the document load function for some reason..
	        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	        	chrome.tabs.sendMessage(tabs[0].id, {friends: "populate"}, function(response) {
	        		//console.log(response.farewell);
	        	});
	        });
	        break;	      
			
      case 'copy':
				console.log("copy");
				console.log(msg.clipboard);
				$('#copytext').text(msg.clipboard);
				$('#copytext').select();
				document.execCommand("Copy", false, null);
				break;
      
      //properly inject css on document load
      case 'inject_css':
					//always inject css into the page
					chrome.tabs.insertCSS(null, {file: 'css/jquery-ui_rgdpstks.css'});
					chrome.tabs.insertCSS(null, {file: 'css/rg-dialog.css'});
					console.log("css injected");
      break;
      
      case 'get_rsa_key':
        port.postMessage({key: rsaKey});
      break;
      
      case 'set_rsa_key':
        console.log("set key to : " + msg.setKey);
        rsaKey = msg.setKey;
        port.postMessage({key: "set key"});
      break;
      
			//If someone sends a typo or an unexpected message to the background page. Just do nothing.
			default:
				console.log("Unrecognized command: " + port.name);
				break;
		}
	})
});