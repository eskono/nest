   try {
       $.getJSON("system/data.json", function(data) {
           dataPack = data;
           try {
               $.each(data, function(key, val) {
                   $(key).html(val);
                   createatom();
               });
           } catch (e) {
               console.log(e);
           }
       });
   } catch (e) {
       console.log(e);
   }