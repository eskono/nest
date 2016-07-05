var dataPack;

function draw() {
    try {
        $.getJSON("system/data.json", function(data) {
            dataPack = data;
            put();
        }).always(function(){
            put();
        });
      } catch (e) {}
}
draw();

function put() {
    $("#classSelect").empty();
    $("#classSelect").append('<option>None</option>');
    $.each(dataPack, function(key, val) {
       
        $("#classSelect").append('<option>' + key + '</option>');
    });
};
$(document).ready(function() {
    $("#classSelect").on('change', setval);

        checkit("input", /[.]+/, "red", "blue", Infinity);
       checkit("textarea", /[.]+/, "red", "blue", Infinity);
       createatom();
});

function setval(event) {
        var className = event.target.value;
         className = $("#classSelect").val();
         $('#className').val(className);
       
        $('#classText').val(dataPack[className]);
       
     $("#classSelect").on('change', setval);

    }

function save() {
    var what = $('#className').val().replace(/[\s]+/, "");
     if( what !== "" && what !== undefined ){
         
    try {
        var item = dataPack[$('#className').val()];
    } catch (e) {}
    if (item) {
        dataPack[$('#className').val()] = $('#classText').val();
        send();
        alert('Text Update!');
    } else {
        var newText = $('#classText').val();
        try {
            Object.defineProperty(dataPack, $('#className').val(), {
                enumerable: true,
                configurable: true,
                writable: true,
                value: newText
            });
        } catch (e) {
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
    else{
   
            alert('Empty Field!');
         
            
        
    }
}

function send() {
    $.ajax({
        url: "system/save.php",
        type: "post",
        data: ({
            text: JSON.stringify(dataPack)
        }),
        beforeSend : function(){
            
     $('body').append('<div id="frame" class="overflow_hidden  b_1px_solid_black br_100% bgc_rgb(255,255,255) w_140px h_140px absolute clean center"><img id="spin" src="system/spinner.gif"  class="w_100px absolute clean center"></div>');
     createatom();
    setInterval(function(){
         $('#spin').remove();
         $('#frame').remove();
    }, 2400);
            
        },
       
        dataType: "json"
    }).fail(function() {
        //alert( "error" );
    }).done(function() {
        //alert( "ok" );
    }).always(function() {
        draw();
    })
}

function del() {
    delete dataPack[$("#classSelect").val()];
    send();
    $('#className').val('');
    $('#classText').val('');
}