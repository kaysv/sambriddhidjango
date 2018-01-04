
//validating email
$("#id_email").on("keyup focus focusout",function(){
  var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
  if(($(this).val().length>0)&&(filter.test($(this).val()))){
    $("#emailError").html("<span id='spanemailSuccess' style='color:green' class='pull-right glyphicon glyphicon-ok-sign'></span><br>");
    $("#register-submit").css("pointer-events","auto");
    email_valid=true;
  }else{
    $("#emailError").html("<span id='spanemailError' style='color:red' class='pull-right glyphicon glyphicon-info-sign'></span><br>");
    email_valid=false;
    $("#register-submit").css("pointer-events","none");
  }
});

// Validating password errror
$("#id_password1").on("keyup focus focusout",function(){
  var validated =  true;
  if(this.value.length < 8)
      validated = false;
  if(!/\d/.test(this.value))
      validated = false;
  if(!/[a-z]/.test(this.value))
      validated = false;
  if(!/[A-Z]/.test(this.value))
      validated = false;
  if(/[^0-9a-zA-Z]/.test(this.value))
      validated = false;
  password1_valid=validated;
  if(!validated){
    $("#password1Error").html("<span id='spanpassword1Error' style='color:red' class='pull-right glyphicon glyphicon-info-sign'></span><br>");
    $("#register-submit").css("pointer-events","none");
  }else{
    if($("#id_password2").val()!=$("#id_password1").val()){
      $("#password2Error").html("<span id='spanpassword2Error' style='color:red' class='pull-right glyphicon glyphicon-info-sign'></span><br>");
      password2_valid=false;
    };
    $("#password1Error").html("<span id='spanpassword1Success' style='color:green' class='pull-right glyphicon glyphicon-ok-sign'></span><br>");
    // $("#register-submit").css("pointer-events","auto");
  };
});

// Validating second password check
$("#id_password2").on("keyup focus focusout",function(){
  if(($("#id_password1").val()==$(this).val()) && ($(this).val())){
    $("#password2Error").html("<span id='spanpassword2Success' style='color:green' class='pull-right glyphicon glyphicon-ok-sign'></span><br>");
    $("#register-submit").css("pointer-events","auto");
    password2_valid=true;

  }else{
    $("#password2Error").html("<span id='spanpassword2Error' style='color:red' class='pull-right glyphicon glyphicon-info-sign'></span><br>");
    $("#register-submit").css("pointer-events","none");
    password2_valid=false;
  };
});


$("#usernameError").hover(function(){
    if($(this).children().attr("id")=="spanusernameError"){
      showSnackbar("Username "+$("#id_username").val()+" exists.",time=3000,timed=true);
    }else if ($(this).children().attr("id")=="wrongUsername") {
      showSnackbar("Username should have character more than 3, with combination of english letters only",time=3000,timed=true)
    }else if ($(this).children().attr("id")=="spanusernameServerError"){
      showSnackbar("Something went wrong. Try again",time=3000,timed=true)
    }else{

    };
});

$("#emailError").hover(function(){
    if($(this).children().attr("id")=="spanemailError"){
      showSnackbar("Enter valid email address.",time=3000,timed=true);
    }else{

    };
});

$("#password1Error").hover(function(){
    if($(this).children().attr("id")=="spanpassword1Error"){
      showSnackbar("At least 8 character with combination of lowercase, uppercase and number ",time=3000,timed=true);
    }else{

    };e
});

$("#password2Error").hover(function(){
    if($(this).children().attr("id")=="spanpassword2Error"){
      showSnackbar("Password does not match.",time=3000,timed=true);
    }else{

    };
});


// Logging in using ajax
$("#register-submit").click(function(e){
  if(username_valid && email_valid && password1_valid && password2_valid){
    valid = true;
  }else{
    showSnackbar("Correct errors. All fields are required.",time=3000,timed=true);
    valid = false;
  };
  if(valid){
    $("#register-submit").css("pointer-events","none");
    $("#register-submit").html("Processing <span id='nameProcessing' \
    class='glyphicon glyphicon-refresh glyphicon-refresh-animate'></span>");
    $("#search-for-button,#search-for-input,#register-form-link,#login-form-link").css("pointer-events","none");
    e.preventDefault();
    var myData = new FormData($("#register-form")[0]);
    $.ajax({
      type: "POST",
      url: "/registration/",
      data: myData,
      success: function(result) {
        if(result=="success"){
          $("#register-submit").css("pointer-events","auto");
          showSnackbar("An activation link is sent in your mail. Click the link to activate. <br> Thank you.",time=3000,timed=false);
          $("#register-submit").html("REGISTER NOW")
          // $("#register-form")[0].reset();
          $("#usernameError").html("<br>");
          $("#emailError").html("<br>");
          $("#password1Error").html("<br>");
          $("#password2Error").html("<br>");
          $("#search-for-button,#search-for-input,#register-form-link,#login-form-link").css("pointer-events","auto");
        }else{
          showSnackbar("Something went wrong. Please try again.",time=3000,timed=true);
          $("#register-submit").html("REGISTER NOW")
          $("#register-form")[0].reset();
          $("#usernameError").html("");
          $("#emailError").html("");
          $("#password1Error").html("");
          $("#password2Error").html("");
          $("#register-submit").css("pointer-events","auto");
          $("#search-for-button,#search-for-input,#register-form-link,#login-form-link").css("pointer-events","auto");
        };
      },
      error:function(result){
        showSnackbar("Server error. Try again.",time=3000,timed=true);
        $("#register-submit").html("REGISTER NOW")
        $("#register-form")[0].reset();
        $("#usernameError").html("");
        $("#emailError").html("");
        $("#password1Error").html("");
        $("#password2Error").html("");
        showSnackbar("Something went wrong during registration. <br> Try again.",time=3000,timed=false);
        $("#register-submit").css("pointer-events","auto");
        $("#search-for-button,#search-for-input,#register-form-link,#login-form-link").css("pointer-events","auto");
      },
      contentType:false,
      processData:false
    });

  }else{
    showSnackbar("There are errors please correct errors.",time=3000,timed=true);
    $("#register-submit").html("REGISTER NOW")
    $("#register-submit").css("pointer-events","none");
    $("#search-for-button,#search-for-input,#register-form-link,#login-form-link").css("pointer-events","auto");
  };

});
