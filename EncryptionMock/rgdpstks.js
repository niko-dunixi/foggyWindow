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

var panelCreated = false;
var panel = $();

$(document).ready(function(){
	createPanel();
});

function createPanel(){
	panel = $('<div />', {id: 'dpstx_pnl'}).appendTo('body').hide().css('z-index', 9001); //It is over nine thousand.
	console.log("Panel appended to document body.");
	panel.css({
		position: 'fixed',
		width: '550',
		height: '350',
		bottom: '0px',
		right: '0px'
	});

	var tbl = $('<div />').addClass('rgdpstxTabs').css('position', 'relative').css('width', '100%').css('height', '100%').appendTo(panel);
	var ecTab = $('<div />').addClass('rgdpstxTab').appendTo(tbl);
	var dcTab = $('<div />').addClass('rgdpstxTab').appendTo(tbl);

	//$('<input/>', {type: 'radio', id: 'tab-1', name:'tab-group-1'}).appendTo(ecTab);
	var ecChk = $('<input type="radio" id="tab-1" name="tab-group-1" checked>').appendTo(ecTab);
	$('<label />', {for: 'tab-1'}).text('Encrypt').appendTo(ecTab);
	var ecTabContent = $('<div/>').addClass('rgdpstxContent').appendTo(ecTab);
	$('<textarea />').css('width', '100%').appendTo(ecTabContent);
	$('<textarea />').css('width', '100%').appendTo(ecTabContent);

	var dcChk = $('<input />', {type: 'radio', id: 'tab-2', name:'tab-group-2'}).appendTo(dcTab);
	$('<label />', {for: 'tab-2'}).text('Decrypt').appendTo(dcTab);
	var dcTabContent = $('<div/>').addClass('rgdpstxContent').appendTo(dcTab);
	$('<textarea />').css('width', '100%').appendTo(dcTabContent);
	$('<textarea />').css('width', '100%').appendTo(dcTabContent);

	ecChk.click(function(){
		dcChk[0].checked = false;
		ecChk[0].checked = true;
	});
	dcChk.click(function(){
		ecChk[0].checked = false;
		dcChk[0].checked = true;
	});
	panelCreated = true;
	panel.show();
}

function destroyPanel(){
	panel.remove();
	panelCreated = false;
}

function sendEmail(){

}

function sendGmail(){

}