var agreed = false;
if (window.localStorage["agreedToGood"] == "true"){
	agreed = true;
}

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
			window.localStorage["agreedToGood"] = true;

			var pki = forge.pki;
			var rsa = pki.rsa;
			var usePair = rsa.generateKeyPair({bits: 2048, e: 0x10001}); //this pair will be for our inital key-pair
			window.localStorage['personalKeys'] = encryptObject($('#pwdOne').val(), [{'name': $('#user').val() + " [Default]", 'public': pki.publicKeyToPem(usePair.publicKey), 'private': pki.privateKeyToPem(usePair.privateKey)}]);
			window.localStorage['publickeys'] = JSON.stringify([{'name': $('#user').val() + " [Default]", 'public': pki.publicKeyToPem(usePair.publicKey)}]);
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
		
	}
});