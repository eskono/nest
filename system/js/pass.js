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
            pass = data;
        } catch (e) {
            console.log(e);
        }
    });
} catch (e) {
    console.log(e);
}

function checkPass() {
  
    if ($('#pass').val() === pass.toString()) {
        temp = Handlebars.compile(source2);
        document.body.innerHTML = temp('');
        draw();
        $("#classSelect").on('change', setval);

    } else {
        alert('False');
    }
}