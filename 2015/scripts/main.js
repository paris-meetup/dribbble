$.fn.selectRange = function(start, end) {
  if(!end) end = start; 
  return this.each(function() {
    if (this.setSelectionRange) {
      this.focus();
      this.setSelectionRange(start, end);
    } else if (this.createTextRange) {
      var range = this.createTextRange();
      range.collapse(true);
      range.moveEnd('character', end);
      range.moveStart('character', start);
      range.select();
    }
  });
};

function addArobaze(){
  $('input[type="text"]').on('click', function(){
    if(!$(this).val()){
      $(this).attr('value','@');
      $(this).selectRange(1);
    }
  })
}
function getUserName(){

  $('input[type="text"]').on('keyup keydown blur', function(){
    var _t = $(this);
    var _tval = _t.val();
    var _userName = _t.val().replace('@','');

    fetchUserInformations(_userName)
  });
};
function fetchUserInformations(_name){
  $.jribbble.getPlayerById(_name, function (player) {
    $('.user-avatar').attr('value', player.avatar_url );
  });
};

function deploy(){
  addArobaze();
  getUserName();
};


$(document).ready(function(){
  deploy()
});