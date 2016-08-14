var source1;
var source2;
var temp;
$(document).ready(function() {
    source1 = $("#passTemplate").html();
    source2 = $("#adminTemplate").html();
    temp = Handlebars.compile(source1);
    document.getElementById('main').innerHTML = temp('');
      checkit("#pass", /[a-zA-Zа-яА-Я]+/, "red", "blue", 20);
    
    });
var pass;
try {
    $.getJSON("system/info.txt", function(data) {
        try {
            if(data!==undefined){
            pass = data;
            }
            else{
            alert('Load error or IP access denied!');
                }
        } catch (e) {
            console.log(e);
             alert('Load error or IP access denied!');
        }
    }).fail(
    
        function() {
   alert('Load error or IP access denied!');
  }
    
    );
} catch (e) {
    console.log(e);
   
}

function checkPass() {
  if(pass!==undefined){
    if ($('#pass').val() === pass.toString()) {
        temp = Handlebars.compile(source2);
        document.body.innerHTML = temp('');
        draw();
        $("#classSelect").on('change', setval);
         CKEDITOR.replace( 'classText', {
toolbar : [
		{ name: 'document', items: [ 'Source', '-', '-', 'NewPage', 'Preview', 'Print', '-', 'Templates' ] },
		{ name: 'clipboard', items: [ 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo' ] },
		{ name: 'editing', items: [ 'Find', 'Replace', '-', 'SelectAll', '-', 'Scayt' ] },
		{ name: 'forms', items: [ 'Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton', 'HiddenField' ] },
		'/',
		{ name: 'basicstyles', items: [ 'Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'RemoveFormat' ] },
		{ name: 'paragraph', items: [ 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl', 'Language' ] },
		{ name: 'links', items: [ 'Link', 'Unlink', 'Anchor' ] },
		{ name: 'insert', items: [ 'Image', 'Flash', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar', 'PageBreak', 'Iframe' ] },
		'/',
		{ name: 'styles', items: [ 'Styles', 'Format', 'Font', 'FontSize' ] },
		{ name: 'colors', items: [ 'TextColor', 'BGColor' ] },
		{ name: 'tools', items: [ 'Maximize', 'ShowBlocks' ] },
		{ name: 'about', items: [ '-' ] }
	]
                          }  );
           } else {
        alert('False');
    }
}
}