var dataPack = {};

function draw() {
    try {
        $.getJSON("system/data.json", function(data) {
            dataPack = data;
            put();
            checkit("input", /[а-яА-Я]+/, "red", "blue", Infinity);
            checkit("textarea", /[.]+/, "red", "blue", Infinity);
        }).always(function() {
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
    checkit("input", /[а-яА-Я]+/, "red", "blue", Infinity);
    checkit("textarea", /[.]+/, "red", "blue", Infinity);
    createatom();
});

function setval(event) {
    var className = event.target.value;
    className = $("#classSelect").val();
    $('#className').val(className);
      CKEDITOR.instances.classText.setData(dataPack[className]);
    $("#classSelect").on('change', setval);
}

function save() {
    var what = $('#className').val().replace(/[\s]+/, "");
    
    if (what !== "" && what !== undefined) {
        try {
            var item = dataPack[$('#className').val()];
        } catch (e) {}
        if (item) {
            alert(CKEDITOR.instances.classText.getData());
            dataPack[$('#className').val()] = CKEDITOR.instances.classText.getData();
            send();
            //alert('Text Update!');
            $("#dialog2").dialog({
                dialogClass: "no-close",
                buttons: [{
                    text: "OK",
                    click: function() {
                        $(this).dialog("close");
                    }
                }]
            });
        } else {
            var newText = CKEDITOR.instances.classText.getData();
            Object.defineProperty(dataPack, $('#className').val().replace(/[\s]+/, ""), {
                enumerable: true,
                configurable: true,
                writable: true,
                value: newText
            });
            send();
            //alert('Add new Class with Text!');
            $("#dialog1").dialog({
                dialogClass: "no-close",
                buttons: [{
                    text: "OK",
                    click: function() {
                        $(this).dialog("close");
                    }
                }]
            });
        }
    } else {
        //alert('Empty Field!');
        $("#dialog3").dialog({
            dialogClass: "no-close",
            buttons: [{
                text: "OK",
                click: function() {
                    $(this).dialog("close");
                }
            }]
        });
    }
}

function send() {
    $.ajax({
        url: "system/save.php",
        type: "post",
        data: ({
            text: JSON.stringify(dataPack)
        }),
        beforeSend: function() {
            $('body').append('<div id="frame" class="overflow_hidden  b_1px_solid_black br_100% bgc_rgb(255,255,255) w_140px h_140px absolute clean center"><img id="spin" src="system/spinner.gif"  class="w_100px absolute clean center"></div>');
            createatom();
            setInterval(function() {
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
    CKEDITOR.instances.classText.setData('');
}
