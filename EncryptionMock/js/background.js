chrome.runtime.onConnect.addListener(function(port) {
	port.onMessage.addListener(function(msg) {
		switch (port.name){
			case 'toggle':
				console.log("Toggle Called.");
				try{
					chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
						chrome.tabs.sendMessage(tabs[0].id, {name: "toggle"}, function(response) {
							console.log(response.result);
						});
					});
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