// $(".picker").colorPick();

$('#profile-image').on('click', function() {
    $('#profile-image-upload').click();
});

// $('#profile-image-enabling').on('click', function() {
//     $('#profile-image-upload').removeAttr("disabled");
//     $('#profile-image-upload').click();
// });

$("#editSavedProfile").click(function(){
  $(this).css("display","none");
  $("#profile-image").removeClass("avoid-clicks");
  $("#profile-image").addClass("show-pointer");

  $(".showProfile").css("display","none");
  $("#profileForm").css("display","block");
  $("#editFinishedSavedProfile").css("display","block");

});

$("#editFinishedSavedProfile").click(function(){
  $(this).css("display","none");
  $("#profile-image").addClass("avoid-clicks");
  $("#profile-image").removeClass("show-pointer");
  $(".showProfile").css("display","block");
  $("#profileForm").css("display","none");
  $("#editSavedProfile").css("display","block");
});
