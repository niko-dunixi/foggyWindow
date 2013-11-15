function encrypt()
{
	var textArea = window.document.getElementById("encryptMessage");
	log("Encrypt stuff");// + textArea.innerHTML);
	//basic URL encoding... 
	textArea.innerHTML = escape(textArea.innerHTML);
}

function decrypt()
{
	log("Decrypt method");
	var textArea = window.document.getElementById("encryptMessage");
	//basic URL encoding... 
	textArea.innerHTML = decodeURI(textArea.innerHTML);
}

function log(log)
{
	console.log(log);
}

function listen()
{
	encrypt;
	console.log("Listener function init");
	var encryptButtons = document.getElementsByTagName("button");
	console.log("Button Elements");
	for(var i = 0; i < encryptButtons.length; i++)
	{
		console.log(encryptButtons[i].innerHTML);
	}
	
	//listen for encrypt button click
	document.getElementById("encryptBtn").addEventListener("click", function() { 
	   log("Encrypt button has been clicked!");
	   encrypt();
	}, false);
	
	
	document.getElementById("decryptBtn").addEventListener("click", function() { 
	   log("Decrypt button has been clicked!");
	   decrypt();
	}, false);

}



window.onload = listen();


