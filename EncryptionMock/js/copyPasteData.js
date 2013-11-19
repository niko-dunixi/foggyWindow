


function addBodyListener()
{
    addCopyPasteClasses();
    
    //$("#copyToField").bind("click", addCopyListen);
    $(".selectDom").bind('click', addDomListen);
    $('.selectDom').css({'cursor': 'crosshair'});
    console.log('add listeners');
}

function addCopyPasteClasses()
{
    //$('*').addClass('changePointer');
    $('input').addClass('selectDom');
    $('textarea').addClass('selectDom');
    console.log('add classes');
}

function addCopyListen()
{
    $(".selectDom").bind('click', addDomListen);
}

function addDomListen()
{
    var domElement = $( this ).get( 0 );
    console.log( "Clicked on - " + domElement.nodeName + ". text: " + $(domElement).val());
    
    var domElmId = $(domElement).attr('id');
    console.log("domElmId: " + domElmId);

    var setTextTo = $('.ecTxtTwo').val();
    console.log('set text to ' + setTextTo);
    $(domElement).val(setTextTo);
    removeDomClass();
}

function removeDomClass()
{
    $(".selectDom").unbind('click');
    $('.selectDom').css({'cursor': 'text'});
    
    //$('*').removeClass('selectDom')
    $('input').removeClass('selectDom')
    $('textarea').removeClass('selectDom')
    console.log('removed classes');
    
}