chrome.runtime.onConnect.addListener(function(port) {
	port.onMessage.addListener(function(msg) {
		switch (port.name){
			case 'toggle':
				console.log(msg.currentTab);
				break;
			default:
				break;
		}
	})
});