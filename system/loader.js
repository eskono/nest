
var dataPack;
function draw(){
    try{
$.getJSON( "system/data.json", function( data ) {
    dataPack = data;
    try{
  $.each( data, function( key, val ) {
    $("."+key).html(val);
      createatom();
  });
    }
    catch(e)
        {
            console.log(e);
        }
    put();
    
});
    }
    catch(e){
    
    
}
}
draw();
    



function put(){
    
    $("#classSelect").empty();
    $("#classSelect").append('<option>None</option>');
      $.each(dataPack, function( key, val ) {
          
    $("#classSelect").append('<option>'+key+'</option>');
  });
   
    
};


$(document).ready(function(){
    
                     
$("#classSelect").on('change', function(event){
    

    
    var className = event.target.value;
    
   $('#className').val(className);
    $('#classText').val(dataPack[className]);
    
});
    checkit("input", /[.]+/, "red", "blue", Infinity);
    checkit("textarea", /[.]+/, "red", "blue", Infinity);
createatom();
});

function save(){
    try{
        
        var item = dataPack[$('#className').val()];
    }
    catch(e){
          
    }
   if( item )
       {
           dataPack[$('#className').val()] =  $('#classText').val();
            send();
           alert('Text Update!');
       }
    else{
     
     var newText = $('#classText').val();
       try{
        Object.defineProperty(dataPack, $('#className').val(), {
  enumerable: true,
  configurable: true,
  writable: true,
  value: newText
});
       }
        catch(e){
            dataPack = {};
            
            Object.defineProperty(dataPack, $('#className').val(), {
  enumerable: true,
  configurable: true,
  writable: true,
  value: newText
}); 
            
        }
        
       send();
           alert('Add new Class with Text!');
        
    }
    
    
    
}

function send(){
    
    $.ajax({
       
        url: "system/save.php",
        type: "post",
        data: ({text : JSON.stringify(dataPack)}),
        dataType: "json"
         
        
    }).fail(function() {
    //alert( "error" );
  }).done(function() {
    //alert( "ok" );
  }).always(function() {
    draw();
  })
    
    
}

function del(){
    
    delete dataPack[$("#classSelect").val()];
    send();
  $('#className').val('');
    $('#classText').val('');
}

