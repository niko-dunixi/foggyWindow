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

<<<<<<< HEAD
$(document).ready(function(){
	//may need to check for lpt
	//console.log("We are in Gmail and need to give it special treatment?: " + inGmail);
	var panel = $('<div />', {id: 'dpstx_pnl'}).appendTo('body').hide().css('z-index', 9001);
=======
var panelCreated = false;
var panel = $();

function togglePanel(){
	console.log("Toggling Panel");
	if (panelCreated == true){
		destroyPanel();
	} else {
		createPanel();
	}
	console.log("Status: " + panelCreated);
}

function createPanel(){
	panel = $('<div />', {id: 'dpstx_pnl'}).appendTo('body').hide().css('z-index', 9001); //It is over nine thousand.
>>>>>>> upstream/master
	console.log("Panel appended to document body.");
	panel.css({
		position: 'fixed',
		width: '550',
		height: '350',
		bottom: '0px',
		right: '0px'
	});

<<<<<<< HEAD
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
=======
	var tbl = $('<div />').addClass('rgdpstxTabs').css('position', 'relative').css('width', '100%').css('height', '100%').appendTo(panel);
	var ecTab = $('<div />').addClass('rgdpstxTab').appendTo(tbl);
	var dcTab = $('<div />').addClass('rgdpstxTab').appendTo(tbl);

	var ecChk = $('<input/>', {type: 'radio', id: 'tab-1', name:'tab-group-1'}).appendTo(ecTab);
	ecChk[0].checked = true;
	$('<label />', {for: 'tab-1'}).text('Encrypt').appendTo(ecTab);
	var ecTabContent = $('<div/>').addClass('rgdpstxContent').appendTo(ecTab);
	var ecTxtOne = $('<textarea />').css('height', '40%').css('width', '100%').appendTo(ecTabContent);
	var ecTxtTwo = $('<textarea />').css('height', '25%').css('width', '100%').appendTo(ecTabContent);
	ecTxtTwo[0].disabled = true;
	ecTxtOne.bind('input propertychange', function(){
		ecTxtTwo.val(encodeURI(ecTxtOne.val()));
	});

	var dcChk = $('<input />', {type: 'radio', id: 'tab-2', name:'tab-group-1'}).appendTo(dcTab);
	$('<label />', {for: 'tab-2'}).text('Decrypt').appendTo(dcTab);
	var dcTabContent = $('<div/>').addClass('rgdpstxContent').appendTo(dcTab);
	var dcTxtOne = $('<textarea />').css('height', '40%').css('width', '100%').appendTo(dcTabContent);
	var dcTxtTwo = $('<textarea />').css('height', '25%').css('width', '100%').appendTo(dcTabContent);
	dcTxtTwo[0].disabled = true;
	dcTxtOne.bind('input propertychange', function(){
		dcTxtTwo.val(encodeURI(dcTxtOne.val()));
	});

	panel.show();
	panelCreated = true;
}

function destroyPanel(){
	panel.remove();
	panelCreated = false;
}
>>>>>>> upstream/master

function sendEmail(){

}

function sendGmail(){

<<<<<<< HEAD
}
=======
}

$(document).ready(function(){
	chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
		if (request.name == "toggle"){
			togglePanel();
		}
		sendResponse({result: "confirmed"});
	});
	console.log("Listener Initiated.");
});
>>>>>>> upstream/master
