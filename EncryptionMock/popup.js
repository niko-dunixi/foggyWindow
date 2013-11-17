var commPort = chrome.runtime.connect({name: "toggle"});
commPort.postMessage({});
window.close();