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

function init(){
  $('input[type="submit"],input[type="email"],input[type="radio"]').prop('disabled', true);
}


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
    fetchUserInformations(_userName);
  });
};
function fetchUserInformations(_name){
  $.jribbble.getPlayerById(_name, function (player) {
    $('#detector').attr('value', player.avatar_url );
    $('input[type="text"]').closest('fieldset').addClass('done')
    $('input[type="email"]').prop('disabled', false)
  });
};

function isValidEmailAddress(emailAddress) {
    var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
    return pattern.test(emailAddress);
};

function emailDetection(){
  $('input[type="email"]').on('keydown keyup blur', function(){
    var emailAddress = $(this).val();
    if( !isValidEmailAddress( emailAddress ) ) { 
      $(this).closest('fieldset').addClass('done');
      $('input[type="radio"]').prop('disabled', true);
    }
  })
}

function form(){
  addArobaze();
  getUserName();
  emailDetection();
}

function deploy(){
  init();
  form();
};


$(document).ready(function(){
  deploy()
});