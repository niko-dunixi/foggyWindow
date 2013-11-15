function encrypt()
{
	var textArea = document.getElementById("encryptMessage");
	console.log("Encrypt stuff");// + textArea.innerHTML);
	textArea.innerHTML = "hi";//escapeAll(textArea.innerHTML);
}
	
document.getElementById("encryptBtn").attachEvent("click", function() { 
       console.log("Clicked") 
}, false);