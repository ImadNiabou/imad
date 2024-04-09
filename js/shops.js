        // shops ajax 
        $(document).ready(function(){
            $(document).ajaxSend(function(){
                $("#shops").html('<div id="divcargando"><img src="img/cargando.gif" alt="cargando"><span>Loading...</span></div>');
            });
  
            $("#shops").load("shop1.html");
  
            $(".shops li>a").each(function(index) {
                $(this).click(function(){
                    event.preventDefault();
                    var indice = index+1;
                    console.log(indice)
                    $("#shops").load("shop"+indice+".html");
                });
            })
  
    });