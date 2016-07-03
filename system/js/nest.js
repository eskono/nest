var jq = document.createElement('script');
jq.src = "system/js/jquery.js";
if (document.getElementsByTagName('head')[0].appendChild(jq)) {
    //alert('load ok!');
    var orna = document.createElement('script');
    orna.src = "system/js/orna.js";
    document.getElementsByTagName('head')[0].appendChild(orna);
    var loader = document.createElement('script');
    loader.src = "system/js/loader.js";
    document.getElementsByTagName('head')[0].appendChild(loader);
} else {
    window.location.reload();
}