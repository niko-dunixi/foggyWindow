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
        panel = $('<div />', {id: 'dpstx_pnl'}).css('z-index', 9001).hide().appendTo('body'); //It is over nine thousand.
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
        var xTab = $('<div />').addClass('rgdpstxTab').css('float', 'right').appendTo(tbl);

        var ecChkBx = $('<input/>', {type: 'radio', id: 'tab-1', name:'tab-group-1'}).appendTo(ecTab);
        ecChkBx[0].checked = true;
        $('<label />', {for: 'tab-1'}).text('Encrypt').appendTo(ecTab);
        var ecTabContent = $('<div/>').addClass('rgdpstxContent').appendTo(ecTab);
        var ecTxtOne = $('<textarea />').css('height', '40%').css('width', '100%').appendTo(ecTabContent);
        var ecTxtTwo = $('<textarea />').addClass('ecTxtTwo').css('height', '25%').css('width', '100%').appendTo(ecTabContent);
        ecTxtTwo[0].disabled = true;
        ecTxtOne.bind('input propertychange', function(){
                ecTxtTwo.val(encodeURI(ecTxtOne.val()));
        });

        var dcChkBx = $('<input />', {type: 'radio', id: 'tab-2', name:'tab-group-1'}).appendTo(dcTab);
        $('<label />', {for: 'tab-2'}).text('Decrypt').appendTo(dcTab);
        var dcTabContent = $('<div/>').addClass('rgdpstxContent').appendTo(dcTab);
        var dcTxtOne = $('<textarea />').css('height', '40%').css('width', '100%').appendTo(dcTabContent);
        var dcTxtTwo = $('<textarea />').css('height', '25%').css('width', '100%').appendTo(dcTabContent);
        dcTxtTwo[0].disabled = true;
        dcTxtOne.bind('input propertychange', function(){
                dcTxtTwo.val(encodeURI(dcTxtOne.val()));
        });
		
		var copyPasteBtn = $('<button />').text('Copy to field').attr('id', 'copyToField').appendTo(ecTabContent);
		$('#copyToField').click(function() {
		  var ecTxtTwoContent = $('.ecTxtTwo').val()
		  console.log('clicked button: ' + ecTxtTwoContent);
		  addBodyListener();
		});

		

        /*
        var xChkBx = $('<input />', {type: 'radio', id: 'tab-3', name:'tab-group-1'}).appendTo(xTab);
        $('<label />', {for: 'tab-3'}).text('X').appendTo(dcTab);
        var xTabContent = $('<div/>').addClass('rgdpstxContent').appendTo(xTab);
        $('<span />').text("you are not supposed to see this.").appendTo(xTabContent)
        */
        
        panel.show();
        panelCreated = true;
}

function destroyPanel(){
        panel.remove();
        panelCreated = false;
}

function sendEmail(){

}

function sendGmail(){

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