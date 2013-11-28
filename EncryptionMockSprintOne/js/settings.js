var agreed = false;
if (localStorage["agreedToGood"] == "true"){
	agreed = true;
}

function manualReset(){ //never called, but can be typed in the console.
	localStorage.removeItem("agreedToGood");
	localStorage.removeItem("personalKeys");
	localStorage.removeItem("publicKeys");
	location.reload();
}

var usrpswrd = ""; 

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
		}
	});
	$('#agreement').show();
}

function verifyUser(){
	$('.scortch').each(function(){
		console.log("Adding SE Handlers.");
		$(this).bind('click', function(){
			console.log("Killing Chunks.");
			manualReset();
		});
	});
	$('#vfyNow').bind('click', function(){
		try{
			console.log("starting");
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
				try{
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

					//commiting those keys.
					localStorage['personalKeys'] = encryptObject(usrpswrd, newStore);
				}catch(error){
				}
			});

			//gets currently selected public key from personal keys.
			$('#shareKey').bind('click', function() {
				console.log("attempting to get public key.");
				try{
					var sel = $('#priv').find(':selected');
					console.log(sel);
					console.log(sel.data('publicKey'));
					if (sel.length > 0){
						$('#pubKeyText').text(sel.data('publicKey'));
					}
				} catch (error){
					console.log(error);
				}
			});

			//Saving a friend's public key.
			$('#saveKey').bind('click', function(){
				try{
					//var pki = forge.pki;
					var pemKey;
					var failed = false;
					try{
						//check to make sure that the public key is actually valid.
						pemKey = $('#keyEntry').val();
						console.log(pemKey);
						forge.pki.publicKeyFromPem(pemKey);
					} catch(error){
						failed = true;
						console.log(error);
						console.log("Probably an invalid public key.");
					}
					if (failed == false){
						$('<option />').data('name', $('#nameEntry').val()).data('publicKey', pemKey).text($('#nameEntry').val()).appendTo($('#publ'));
						//re-parsing keys.
						var newStore = new Array();
						$('#publ option').each(function(index, value){
							newStore.push({'name': $(this).data('name'), 'publicKey': $(this).data('publicKey')});
						});
						localStorage['publicKeys'] = JSON.stringify(newStore);
					}
				} catch (error){
				}
			});
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