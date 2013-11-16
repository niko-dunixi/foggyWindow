if(top.document != document) {
	console.log("This is an iframe. Aborted.");
	return; //Stop. We only want to work in the main document, not in any embeded iframes.
}
console.log("Successfully injected");


var inGmail = false;
if (/^https:\/\/mail\.google\.com\/.*/i.test(window.location)){
	console.log("This page is Gmail");
	inGmail = true;
}

$(document).ready(function(){
	//may need to check for lpt
	//console.log("We are in Gmail and need to give it special treatment?: " + inGmail);
	var panel = $('<div />', {id: 'dpstx_pnl'}).appendTo('body').hide().css('z-index', 9001);
	console.log("Panel appended to document body.");
	panel.css({
		position: 'fixed',
		width: '550',
		height: '350',
		bottom: '0px',
		right: '0px'
	});

	var tbl = $('<div />').appendTo(panel).css('position', 'relative').css('width', '100%').css('height', '100%');;
	var rOne = $('<div />').appendTo(tbl).css('height', '55%');
	var rTwo = $('<div />').appendTo(tbl).css('height', '35%'); //d2
	var rThree = $('<div />').appendTo(tbl).css('height', '0%');
	var rFour = $('<div />').appendTo(tbl).css('height', '0%');
	$('<textarea />').appendTo(rOne).css('width', '100%').css('height', '100%');
	$('<textarea />').appendTo(rTwo).css('width', '100%').css('height', '100%');
	$('<select />').appendTo(rThree).css('width', '100%').css('height', '10%');
	$('<button type="button"/>').text("Encrypt").appendTo($('<div />').appendTo(rFour).css('width', '50%')).css('height', '100%');
	$('<button type="button"/>').text("Decrypt").appendTo($('<div />').appendTo(rFour).css('width', '50%')).css('height', '100%');

	/*
	var tbl = $('<table />').appendTo(panel).css('width', '100%').css('height', '100%');;
	var rOne = $('<tr />').appendTo(tbl);
	var rTwo = $('<tr />').appendTo(tbl).css('height', '35%'); //d2
	var rThree = $('<tr />').appendTo(tbl).css('height', '0%');
	var rFour = $('<tr />').appendTo(tbl).css('height', '0%');
	$('<textarea />').appendTo($('<td colspan="2"/>').appendTo(rOne)).css('width', '100%').css('height', '100%');
	$('<textarea />').appendTo($('<td colspan="2"/>').appendTo(rTwo)).css('width', '100%').css('height', '100%');
	$('<select />').appendTo($('<td colspan="2"/>').appendTo(rThree)).css('width', '100%');
	$('<button type="button"/>').text("Encrypt").appendTo($('<td />').appendTo(rFour).css('width', '50%')).css('height', '100%');
	$('<button type="button"/>').text("Decrypt").appendTo($('<td />').appendTo(rFour).css('width', '50%')).css('height', '100%');
	*/


	panel.show();
});

function sendEmail(){

}

function sendGmail(){

}