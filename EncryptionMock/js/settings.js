var agreed = false;
if (window.localStorage["agreedToGood"] === "true"){
	agreed = true;
}

$(document).ready(function(){
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
		console.log($(this).val());
		if ($(this).val().length < 10){
			$(this).removeClass('valid');
			$(this).addClass('error');
		} else {
			$(this).removeClass('error');
			$(this).addClass('valid');
		}
		if ($(this).val().localeCompare($('#pwdTwo').val()) != 0){
			$('#pwdTwo').removeClass('valid');
			$('#pwdTwo').addClass('error');
		} else {
			$('#pwdTwo').removeClass('error');
			$('#pwdTwo').addClass('valid');
		}
	});

	$('#pwdTwo').bind('input propertychange', function(){
		console.log($(this).val());
		if ($(this).val().length < 10 || $(this).val().localeCompare($('#pwdOne').val()) != 0){
			$(this).removeClass('valid');
			$(this).addClass('error');
		} else {
			$(this).removeClass('error');
			$(this).addClass('valid');
		}
	});

	if (agreed == false){
		$('#agreement').show();
	}
});