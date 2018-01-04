// Toast to display error
function showSnackbar(msg,time,timed) {
    var x = document.getElementById("snackbar");
    if(timed){
      var message="<p>"+msg+"</p>";
    }else{
      var message="<p>"+msg+"</p>"+"<p><small>click to remove this message</small></p><br>";
    };
    $(x).html(message);
    x.className = "show";
    if(timed){
      setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
    };
};

$("#snackbar").click(function(){
  $(this).removeClass("show");
});
