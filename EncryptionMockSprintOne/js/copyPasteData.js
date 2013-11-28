var encryptButton;

function addBodyListener(clickedEncryptBtn)
{
  encryptButton = clickedEncryptBtn;
  console.log("Encrypt button clicked? " + encryptButton);
  addCopyPasteClasses();
  
  $(".selectDom").bind('click', addDomListen);
  $('.selectDom').css({'cursor': 'crosshair'});
  console.log('add listeners');
}

function addCopyPasteClasses()
{
  //$('*').addClass('changePointer');
  $('input').addClass('selectDom');
  $('textarea').addClass('selectDom');
  $('.editable').addClass('selectDom');
  
  console.log('add classes');
}

function addDomListen()
{
  console.log('clicked encrypt button? ' + encryptButton.toString())
  var domElement = $( this ).get( 0 );
  console.log( "Clicked: " + domElement.nodeName + ", domElmId: " + domElmId + ", text: " + $(domElement).val());
  
  //clicked dom element
  var domElmId = $(domElement).attr('id');
  console.log("domElmId: " + domElmId);

  //what to set dom text to
  var setTextTo = $('#ecTxtTwo').val();
  
  //decrypt
  var decryptField = $('#dcTxtOne');
  
  
  if ($(domElement).hasClass(".Am"))
  {
    console.log('we are dealing with gmail..');
    $(domElement).html(setTextTo); //isn't working..
  }
  else
  {
    //do this if the encrypt button was clicked
    if (encryptButton)
    {
      $(domElement).val(setTextTo);
    }
    //do this if the decrypt button was clicked
    else
    {
      $(decryptField).val($(domElement).val())
      $(decryptField).trigger('input');
    }
    
    
  }
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