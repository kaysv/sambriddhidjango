$("#login-submit").click(function(e){
  e.preventDefault();
  if(!$("#username").val() || !$("#password").val()){
    showSnackbar("Please enter username and password.",time=3000,timed=true);
  }else{
    $("#login-submit").html("Processing <span id='nameProcessing' \
    class='glyphicon glyphicon-refresh glyphicon-refresh-animate'></span>");

    $("#username,#password,#login-submit,#search-for-button,#search-for-input,\
    #register-form-link,#login-form-link,#forgot-password").css("pointer-events","none");

    var myData = new FormData($("#login-form")[0]);
    $.ajax({
      type: "POST",
      url: "/login/",
      data: myData,
      success: function(result) {
        if(result=="success"){
          location.reload();
        }else{
          showSnackbar("Username and password did not match.",time=3000,timed=true);
          $("#login-submit").html("LOGIN");
          $("#username,#password,#login-submit,#search-for-button,#search-for-input,\
          #register-form-link,#login-form-link,#forgot-password").css("pointer-events","auto");
        };
      },
      error:function(result){
        showSnackbar("Something went wrong. Try again.",time=3000,timed=true);
        $("#login-submit").html("LOGIN");
        $("#username,#password,#login-submit,#search-for-button,#search-for-input,\
        #register-form-link,#login-form-link,#forgot-password").css("pointer-events","auto");
      },
      contentType:false,
      processData:false
    });
  };
});
