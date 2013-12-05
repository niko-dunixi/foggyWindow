var initialized = localStorage['initialized'];
if (typeof initialized == "undefined"){
	localStorage['initialized'] = true;
	localStorage['friends'] = new Array();
}

//Chrome listener API. The connection between the injected script and the local storage + vice versa.
chrome.runtime.onConnect.addListener(function(port) {
      //always inject css into the page
      chrome.tabs.insertCSS(null, {file: 'css/jquery-ui.css'});
      chrome.tabs.insertCSS(null, {file: 'css/rg-dialog.css'});
  console.log('recieved message port ' + port.name);    
  
	port.onMessage.addListener(function(msg) {
  console.log('recieved message inside' + msg);    
  
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
			//If someone sends a typo or an unexpected message to the background page. Just do nothing.
			default:
				console.log("Unrecognized command.");
				break;
		}
	})
});