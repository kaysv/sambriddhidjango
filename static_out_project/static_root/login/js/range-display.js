function setValue(input) {
  demo=$(input).attr('showon');
  var output = document.getElementById(demo);
  input.oninput = function() {
    output.innerHTML = this.value;
  }
};
