// Validating Profile Photo
$( "#profile-image-upload" ).change(function(){
  var file = this.files[0];
  var fileType = file["type"];
  var ValidImageTypes = ["image/jpeg"];
  if ($.inArray(fileType, ValidImageTypes) < 0) {
     showSnackbar("Invalid Image Format, rquired format jpeg/jpg",time=3000,timed=true);
  }else{
    if (this.files && this.files[0]){
      var reader = new FileReader();

      reader.onload = function(e) {
        $('#profile-image').attr('src', e.target.result);
      };
      reader.readAsDataURL(this.files[0]);
    };
    // $("#profileName").removeAttr('disabled');
  };
});

//Creating template functions
function CheckError(input,check_type) {
  if(check_type=="text"){
    return $(input).val().length>4
  }else if (check_type=="address") {
    return $(input).val().length>14
  }else if (check_type=="email") {
    var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if($(input).val().length>0){
      return filter.test($(input).val())
    }else{
      return false;
    };
  }else if(check_type=="phone"){
    var filterNum = /^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/;
    // return filterNum.test($(input).val());
    if($(input).val().length>9){
      return filterNum.test($(input).val());
    }else {
      return false;
    };
  }else{
    return false;
  };
};


function validate1(input,next_id,submit_id,process_id,error_id,success_id,show_submit,check_type) {
  // $(next_id).attr('disabled','disabled');


  check_status=CheckError(input,check_type);

  if(check_status){
    $(process_id).css("display","none");
    $(error_id).css("display","none");
    $(success_id).css("display","block");
    // $(next_id).removeAttr('disabled');
    $(submit_id).css("display","block");
  }else{
    $(success_id).css("display","none");
    $(error_id).css("display","none");
    $(process_id).css("display","block");
    $(submit_id).css("display","none");
  };
};

function validate2(input,next_id,submit_id,process_id,error_id,success_id,show_submit,check_type) {
  // $(next_id).attr('disabled','disabled');

  check_status=CheckError(input,check_type);

  if(check_status){
    $(process_id).css("display","none");
    $(error_id).css("display","none");
    $(success_id).css("display","block");
    // $(next_id).removeAttr('disabled');
    $(submit_id).css("display","block");
  }else{
    $(success_id).css("display","none");
    $(process_id).css("display","none");
    $(error_id).css("display","block");
    $(submit_id).css("display","none");
  };
};


function validateProfile(id,next_id,submit_id,process_id,error_id,success_id,show_submit,check_type) {
  $(id).on('keyup focus',function(e){
    validate1(this,next_id,submit_id,process_id,error_id,success_id,show_submit,check_type);
  });

  $(id).on('focusout',function(e){
    validate2(this,next_id,submit_id,process_id,error_id,success_id,show_submit,check_type);
  });
};

validateProfile("#profileName","#profileTitle","#profileSubmit","#nameProcessing","#nameError","#nameSuccess",false,'text');
validateProfile("#profileTitle","#profileAddress","#profileSubmit","#titleProcessing","#titleError","#titleSuccess",false,'text');
validateProfile("#profileAddress","#profileEmail","#profileSubmit","#addressProcessing","#addressError","#addressSuccess",false,'address');
validateProfile("#profileEmail","#profilePhone","#profileSubmit","#emailProcessing","#emailError","#emailSuccess",false,'email');
validateProfile("#profilePhone","#profileSubmit","#profileSubmit","#phoneProcessing","#phoneError","#phoneSuccess",true,'phone');

//Check Validations when profile submit is clicked
$("#profileSubmit").click(function(){
  var error=$("#nameError").css('display')=='block' ||
            $("#titleError").css('display')=='block' ||
            $("#addressError").css('display')=='block' ||
            $("#emailError").css('display')=='block' ||
            $("#phoneError").css('display')=='block' ;
  if(error){
    showSnackbar("Correct wrong inputs",time=3000,timed=true);
  }else{
    // alert("Ready For Ajax post")
    //Here Ajax POST
    showSnackbar("Profile Updating.",time=3000,timed=false);
    $("#profileSubmitDiv").css("display","none");
    // $("iSave").addClass("avoid-clicks");
    // $("showProfileSubmitProcess").addClass("avoid-clicks");
    // $("#showProfileSubmitProcess").removeClass("glyphicon-floppy-saved").addClass("glyphicon-refresh glyphicon-refresh-animate");
    var myData = new FormData($("#profileForm")[0]);
    $.ajax({
              type: "POST",
              url: "/submitprofile/",
              data: myData,
              success: function(result) {
              // alert("success");
              showSnackbar("Successfully profile updated",time=3000,timed=true);
              $(".showProfile").css("display","block");
              $("#profileForm").css("display","none");
              $("#profile-image").addClass("avoid-clicks");
              $("#profile-image").removeClass("show-pointer");
              $("#editSavedProfile").css("display","block");
              $("#editFinishedSavedProfile").css("display","none");
              $("#labelShowName").html($("#profileName").val());
              $("#labelShowTitle").html($("#profileTitle").val());
              $("#labelShowAddress").html($("#profileAddress").val());
              $("#labelShowEmail").html($("#profileEmail").val());
              $("#labelShowPhone").html($("#profilePhone").val());
              },
              error:function(result){
                showSnackbar("Something went wrong. Please try again.",time=3000,timed=true);

              },
              contentType:false,
              processData:false
          });
          $("#profileSubmitDiv").css("display","none");
          $("#showProfileSubmitProcess").removeClass("glyphicon-refresh glyphicon-refresh-animate").addClass("glyphicon-floppy-saved");
  };
});

//Hovering over error shows toast
$("#nameError").hover(function(){
  showSnackbar("Name should not be 5 or more character long.",time=3000,timed=true);
});
$("#titleError").hover(function(){
  showSnackbar("Title should not be 5 or more character long.",time=3000,timed=true);
});
$("#addressError").hover(function(){
  showSnackbar("Address should not be 15 or more character long.",time=3000,timed=true);
});
$("#emailError").hover(function(){
  showSnackbar("Email should be valid email address.",time=3000,timed=true);
});
$("#phoneError").hover(function(){
  showSnackbar("Telephone should contain 10 or more digits.",time=3000,timed=true);
});

// Error for disabled Profile Name click
$('#profileNameHead').click(function() {
   if($("#profileName").is(":disabled")){
     showSnackbar("First add your profile picture.",time=3000,timed=true);
   };
});


//Error for disabled Title click
$('#profileTitleHead').click(function() {
   if($("#profileTitle").is(":disabled")){
     showSnackbar("First fill above information.",time=3000,timed=true);
   };
});

//Error for disabled Address click
$('#profileAddressHead').click(function() {
   if($("#profileAddress").is(":disabled")){
     showSnackbar("First fill above information.",time=3000,timed=true);
   };
});

//Error for disabled Email click
$('#profileEmailHead').click(function() {
   if($("#profileEmail").is(":disabled")){
     showSnackbar("First fill above information.",time=3000,timed=true);
   };
});

//Error for disabled Phone click
$('#profilePhoneHead').click(function() {
   if($("#profilePhone").is(":disabled")){
     showSnackbar("First fill above information.",time=3000,timed=true);
   };
});


// // Toast to display error
// function showSnackbar(msg) {
//     var x = document.getElementById("snackbar")
//     var message="<p>"+msg+"</p>";
//     $(x).html(message);
//     x.className = "show";
//     setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
// }
