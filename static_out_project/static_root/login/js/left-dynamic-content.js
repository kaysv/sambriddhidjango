var countSkills=0;
var countLanguages=0;
var skillset=[];
var skillrangeset=[];
var languageset=[];
var languagerangeset=[];
$('#addSkills').click(function(){
  sk="skill"+countSkills;
  skr="skillrange"+countSkills;
  skillset.push(sk);
  skillrangeset.push(skr);
  $('#skills_collection').append("\
  <div class='well  ' id='subskills"+countSkills+"'>\
    <div class=''>\
      <hr>\
      <input class='line-input-black pull-right' type='text' name='skill"+countSkills+"' id='skill"+countSkills+"' placeholder='Enter your skill' required>\
    </div>\
    <br>\
    <div id='slidecontainer' style='padding-top:20px;'>\
      <input type='range' min='0' max='100' showon='demoS"+countSkills+"' value='50' oninput='setValue(this);' class='slider' id='skillrange"+countSkills+"' name='skillrange"+countSkills+"'>\
      <br>\
      <p>Score your skills proficiency: <span id='demoS"+countSkills+"'>50</span>%</p>\
      <button id='removediv"+countSkills+"' class='btn btn-danger pull-right' divIdToRemove='subskills"+countSkills+"' skill='skill"+countSkills+"' skillrange='skillrange"+countSkills+"' onclick='removeSkillsDiv(this);'>remove</button>\
      <br>\
    </div>\
  </div>\
  ");
  countSkills+=1;
});

$('#addLanguage').click(function(){
  lk="language"+countLanguages;
  lkr="languagerange"+countLanguages;
  languageset.push(lk);
  languagerangeset.push(lkr);
  $('#language_collection').append("\
  <div class='well' id='sublanguages"+countLanguages+"'>\
    <div class=''>\
      <hr>\
      <input class='line-input-black pull-right' type='text' name='language"+countLanguages+"' id='language"+countLanguages+"' placeholder='Enter language' required>\
    </div>\
    <br>\
    <div id='slidecontainer' style='padding-top:20px;'>\
      <input type='range' min='0' max='100' showon='demoL"+countLanguages+"' value='50' oninput='setValue(this);' class='slider' id='languagerange"+countLanguages+"' name='languagerange"+countLanguages+"'>\
      <br>\
      <p>Score your language proficiency: <span id='demoL"+countLanguages+"'>50</span>%</p>\
      <button id='removediv"+countLanguages+"' class='btn btn-danger pull-right' divIdToRemove='sublanguages"+countLanguages+"' language='language"+countLanguages+"' languagerange='languagerange"+countLanguages+"' onclick='removeLanguageDiv(this);'>remove</button>\
      <br>\
    </div>\
  </div>\
  ");
  countLanguages+=1;
});


function removeSkillsDiv(input){
  skill=$(input).attr('skill');
  skillrange=$(input).attr('skillrange');
  skillset.splice($.inArray(skill ,skillset),1);
  skillrangeset.splice($.inArray(skillrange ,skillrangeset),1);
  idremove=$(input).attr('divIdToRemove');
  document.getElementById(idremove).remove();
};

function removeLanguageDiv(input) {
  language=$(input).attr('language');
  languagerange=$(input).attr('languagerange');
  languageset.splice($.inArray(language ,languageset),1);
  languagerangeset.splice($.inArray(languagerange ,languagerangeset),1);
  idremove=$(input).attr('divIdToRemove');
  document.getElementById(idremove).remove();
};
// how to check children
//   if ( $('#myfav').children().length > 0 ) {
//      // do something
// }

// $("#YourElementID").css("display","block");
