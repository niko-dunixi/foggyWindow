//there was a problem getting the images to load properly..
//Thank you mr PAEz
//http://stackoverflow.com/questions/13669762/chrome-extention-using-jquery-in-content-script-resolve-error-when-creating-dial


//adds the html of the dialog to the page. This should be removed at a later time.
function addDialogHtml()
{
  $('body').append('<div id="dialog" title="Add Friend"><p>This is the mock dialog for adding a friend</p></div>');
}

function popDialog()
{
  $('#dialog').dialog();
}