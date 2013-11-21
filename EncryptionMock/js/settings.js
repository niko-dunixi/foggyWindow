var agreed = false;
if (localStorage["agreedToGood"] == "true"){
	agreed = true;
}

function manualReset(){ //never called, but can be typed in the console.
	localStorage.removeItem("agreedToGood");
}

var usrpswrd = ""; //I'll admit this isn't the best place for this to be.

function notAgreed(){
	$('#user').bind('input propertychange', function(){
		if ($(this).val().length == 0){
			$(this).removeClass('valid');
			$(this).addClass('error');
		} else {
			$(this).removeClass('error');
			$(this).addClass('valid');
		}
	});
	$('#pwdOne').bind('input propertychange', function(){
		if ($(this).val().length < 10){
			$(this).removeClass('valid');
			$(this).addClass('error');
		} else {
			$(this).removeClass('error');
			$(this).addClass('valid');
		}
		if ($(this).val() != $('#pwdTwo').val()){
			$('#pwdTwo').removeClass('valid');
			$('#pwdTwo').addClass('error');
		} else {
			$('#pwdTwo').removeClass('error');
			$('#pwdTwo').addClass('valid');
		}
	});
	$('#pwdTwo').bind('input propertychange', function(){
		if ($(this).val().length < 10 || $(this).val() != $('#pwdOne').val()){
			$(this).removeClass('valid');
			$(this).addClass('error');
		} else {
			$(this).removeClass('error');
			$(this).addClass('valid');
		}
	});
	$('#agree').bind('click', function(){
		var stop = false;
		if ($('#user').val().length == 0){
			console.log("name too short");
			$('#user').addClass('error');
			stop = true;
		}
		if ($('#pwdOne').val().length < 10){
			console.log("one too short");
			$('#pwdOne').addClass('error');
			stop = true;
		}
		if ($('#pwdTwo').val().length < 10){
			console.log("2 too short");
			$('#pwdTwo').addClass('error');
			stop = true;
		}
		if ($('#pwdOne').val() != $('#pwdTwo').val()){
			console.log("not same");
			$('#pwdTwo').addClass('error');
			stop = true;
		}
		if (stop == false){
			console.log("We good");
			/* Here goes nothing guys. Wish us all luck. */
			localStorage["agreedToGood"] = true;
			$('#pwdOne')[0].disabled = true;
			$('#pwdTwo')[0].disabled = true;
			$('#user')[0].disabled = true;
			$(this)[0].disabled = true;
			$(this).text('Processing...');
			var pki = forge.pki;
			var rsa = pki.rsa;
			var usePair = rsa.generateKeyPair({bits: 2048, e: 0x10001}); //this pair will be for our inital key-pair
			localStorage['personalKeys'] = encryptObject($('#pwdOne').val(), [{'name': $('#user').val() + " [Default]", 'publicKey': pki.publicKeyToPem(usePair.publicKey), 'privateKey': pki.privateKeyToPem(usePair.privateKey)}]);
			localStorage['publicKeys'] = JSON.stringify([{'name': $('#user').val() + " [Default]", 'publicKey': pki.publicKeyToPem(usePair.publicKey)}]);
			location.reload();
			/* // got the better library to work. Commenting out in case I need this later.
			var ourRsa =  cryptico.generateRSAKey($('#pwdOne').val(), 2048);
			window.localStorage["masterKey"] = cryptico.publicKeyString(ourRsa);
			window.localStorage["personalKeys"] = cryptico.encrypt(JSON.stringify([{'name': $('#user').val(), 'private': cryptico]), ourRsa);
			window.localStorage["friendsKeys"] = JSON.stringify([{'name': $('#user').val()}]);
			*/
		}
	});
	$('#agreement').show();
}

function verifyUser(){
	$('#vfyNow').bind('click', function(){
		try{
			console.log("stargin");
			var personalKeys = decryptObject($('#pwdNow').val(), window.localStorage['personalKeys']);
			var publicKeys = JSON.parse(window.localStorage['publicKeys']);
			$('#pwdNow').removeClass('error').addClass('valid');
			$.each(personalKeys, function(key, value){
				console.log(key);
				console.log(value);
				$('<option />').data('name', value.name).data('privateKey', value.privateKey).data('publicKey', value.publicKey).text(value.name).appendTo($('#priv'));
			});
			$.each(publicKeys, function(key, value){
				console.log(key);
				console.log(value);
				$('<option />').data('name', value.name).data('publicKey', value.publicKey).text(value.name).appendTo($('#publ'));
			});
			usrpswrd = $('#pwdNow').val();
			$('#pwdNow').remove();
			$('#verify').hide();

			//generate a new private and corisponding key (Gen New Key Button)
			$('#genKey').bind('click', function(){
				var pki = forge.pki;
				var rsa = pki.rsa;
				var pair = rsa.generateKeyPair({bits: 2048, e: 0x10001}); //this pair will be for our inital key-pair
				var a = pki.privateKeyToPem(pair.privateKey);
				var b = pki.publicKeyToPem(pair.publicKey);

				//appending new key to the options list.
				$('<option />').data('name', "Surplus Key " + String($('#priv option').length)).data('privateKey', a).data('publicKey', b).text("Surplus Key " + String($('#priv option').length)).appendTo($('#priv'));

				//re-parsing keys.
				var newStore = new Array();
				$('#priv option').each(function(index, value){
					newStore.push({'name': $(this).data('name'), 'privateKey': $(this).data('privateKey'), 'publicKey': $(this).data('publicKey')});
				});

				//comming those keys.
				localStorage['personalKeys'] = encryptObject(usrpswrd, newStore);
			});

			$('#shareKey').bind('click', function(){
				var sel = $('#priv option:selected');
				if (sel.length){
					$('#pubKeyText').text(sel.data('publicKey'));
				}
			})

			$('#control').show();
		}catch(error){
			$('#pwdNow').addClass('error');
			console.log(error);
		}
	});
	$('#verify').show();
}

function encryptObject(pwd, obj){
	return btoa(sjcl.encrypt(pwd, JSON.stringify(obj)));
}
function decryptObject(pwd, obj){
	return JSON.parse(sjcl.decrypt(pwd, atob(obj)));
}

$(document).ready(function(){
	if (agreed == false){
		notAgreed();
	} else {
		verifyUser();
	}
});



/*
Moved this from the other page, it made more sense to keep the practical example of working code in an actual code file. Plus something weird is happening with the page formatting. Need to investigate.

<!--
After literally two days of work, FINALLY we make some gd progress!!
Usage example so I don't forget later.

AES example:
btoa(sjcl.encrypt("Pants", "These are my pants"));
"eyJpdiI6IjZmeE5SMUVPdTFscldlY2xjQkNRM2c9PSIsInYiOjEsIml0ZXIiOjEwMDAsImtzIjoxMjgsInRzIjo2NCwibW9kZSI6ImNjbSIsImFkYXRhIjoiIiwiY2lwaGVyIjoiYWVzIiwic2FsdCI6IkpEaWFBT0hESXFJPSIsImN0IjoiSlRZNXg4UktCOHhORmMzanc2c1ZnZUd0MTA4d3pSdThteHM9In0="
sjcl.decrypt("Pants", atob("eyJpdiI6IjZmeE5SMUVPdTFscldlY2xjQkNRM2c9PSIsInYiOjEsIml0ZXIiOjEwMDAsImtzIjoxMjgsInRzIjo2NCwibW9kZSI6ImNjbSIsImFkYXRhIjoiIiwiY2lwaGVyIjoiYWVzIiwic2FsdCI6IkpEaWFBT0hESXFJPSIsImN0IjoiSlRZNXg4UktCOHhORmMzanc2c1ZnZUd0MTA4d3pSdThteHM9In0="));
"These are my pants"

RSA example:
var rsa = forge.pki.rsa;
var keypair = rsa.generateKeyPair({bits: 2048, e: 0x10001});
var ct = btoa(keypair.publicKey.encrypt("Pants"));
ct;
keypair.privateKey.decrypt(atob(ct));

!-->
*/