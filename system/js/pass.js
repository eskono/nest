 var pass;
     try{
$.getJSON( "system/info.txt", function( data ) {
   
    try{
        
         pass = data;

    }
    catch(e)
        {
            console.log(e);
        }
});}
catch(e){
    console.log(e);
}
        
        function checkPass(){
            
            if($('#pass').val()===pass.toString()){
                
                window.location = "system/nestadmin.html";
            }
            else{
                
                alert('False');
            }
            
        }