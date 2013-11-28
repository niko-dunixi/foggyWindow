var initialized = localStorage['initialized']; //this checks to see if this is the first time this extension has ever been run.
if (typeof initialized == "undefined"){
	window.open("settings.html", "NewWindow"+String(Math.floor(Math.random()*7000)));
	localStorage['initialized'] = true;
}

chrome.runtime.onConnect.addListener(function(port) {
	port.onMessage.addListener(function(msg) {
		switch (port.name){
			case 'toggle':
				console.log("Toggle Called.");
				try{
					if (localStorage["agreedToGood"] != "true"){ //force the user to accept user license, but more importantly generate inital key.
						window.open("settings.html", "NewWindow"+String(Math.floor(Math.random()*7000)));
					} else { //once they have generated the inital keys we proceed as normal.
						chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
							chrome.tabs.sendMessage(tabs[0].id, {'name': 'toggle', 'publKeys': localStorage['publicKeys'], 'privKeys': localStorage['personalKeys']}, function(response) {
								console.log(response.result);
							});
						});
					}
				} catch (err){
					console.log(err.message);
				}
				break;
			default:
				console.log("Unrecognized command.");
				break;
		}
	})
});
