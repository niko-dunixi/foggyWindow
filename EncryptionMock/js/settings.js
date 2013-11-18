var agreed = false;
if (window.localStorage["agreedToGood"] === "true"){
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
		}
	});
	$('#agreement').show();
}

$(document).ready(function(){
	if (agreed == false){
		notAgreed();
	}
});