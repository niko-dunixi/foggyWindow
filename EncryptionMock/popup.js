var commPort = chrome.runtime.connect({name: "toggle"});
//commPort.postMessage({currentTab: chrome.tabs.getSelected()});
commPort.postMessage({});
//commPort.onMessage.addListener(function(response){
//});
window.close();