!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):"object"==typeof exports?module.exports=e(require("jquery")):e(jQuery)}(function(e){function n(e){return u.raw?e:encodeURIComponent(e)}function o(e){return u.raw?e:decodeURIComponent(e)}function i(e){return n(u.json?JSON.stringify(e):String(e))}function t(e){0===e.indexOf('"')&&(e=e.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\"));try{return e=decodeURIComponent(e.replace(c," ")),u.json?JSON.parse(e):e}catch(n){}}function r(n,o){var i=u.raw?n:t(n);return e.isFunction(o)?o(i):i}var c=/\+/g,u=e.cookie=function(t,c,s){if(arguments.length>1&&!e.isFunction(c)){if(s=e.extend({},u.defaults,s),"number"==typeof s.expires){var a=s.expires,d=s.expires=new Date;d.setMilliseconds(d.getMilliseconds()+864e5*a)}return document.cookie=[n(t),"=",i(c),s.expires?"; expires="+s.expires.toUTCString():"",s.path?"; path="+s.path:"",s.domain?"; domain="+s.domain:"",s.secure?"; secure":""].join("")}for(var f=t?void 0:{},p=document.cookie?document.cookie.split("; "):[],l=0,m=p.length;m>l;l++){var x=p[l].split("="),g=o(x.shift()),j=x.join("=");if(t===g){f=r(j,c);break}t||void 0===(j=r(j))||(f[g]=j)}return f};u.defaults={},e.removeCookie=function(n,o){return e.cookie(n,"",e.extend({},o,{expires:-1})),!e.cookie(n)}});
function freshStyle(stylesheet){
  setTimeout(function(){
    $('#list').attr('href',stylesheet);
  } , 150)
}


function inputIndex(){
  var i = 0;
  $('input').each(function(){
    i++;
    $(this).attr('tabindex',i);
  })
}

var inDevelopement = false;
var myDataRef = new Firebase('https://dbbb-parismeetup.firebaseio.com/atendees');
var restyled = 'styles/over-list.css'; 

function tokenize(){
  var url = 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=';
  var rand =  Math.random().toString(36).substr(2);
  var now = Date.now();
  var token = rand + rand + now;
  var securl = url + token;
  $('#ponytag').attr('value', url + now + 'ParisDribbbleMeetup - ' + $('input[type="text"]').val());
  $('#token').attr('value', token);
}


var onComplete = function(error) {
  if (error) {
    console.log('Synchronization failed');
  } else {
    console.log('Synchronization succeeded');
  }
};
function loadBase(){
  // Attach an asynchronous callback to read the data at our posts reference
  myDataRef.on("child_added", function(snapshot) {
    var atendee = snapshot.val();
    $('.user-list ul').append('<li><a href="http://dribbble.com/'+ atendee.name.replace('@','') +'" target="_blank"><img src="'+ atendee.avatar + '" /></a></li>');
    freshStyle(restyled);
    getAtendeeLength()

  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
}

function getAtendeeLength(){
  var num = $('.user-list li').length;
  $('#total-subscribed').empty().append(num)
}



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
  var dbbbColor = '#ea4c89';
  $('#showMore').css('display','block !important')
  $('input[type="button"],input[type="email"],input[type="checkbox"]').prop('disabled', true);

  setTimeout(function(){
    if ($.cookie('alreadyIn')=='1') {
      $('body').addClass('washere')
      $('#inscription').remove();
      $('#thankyou').removeClass('hidden');
      $(".user-subscribed img").removeClass('twisted');

      $('#userImage').attr('src', $.cookie('userImage'));
      $('#userName').empty().append($.cookie('userName'));

      loadBase();

      $('input[type="button"]').prop('disabled', true).remove();
      setTimeout(function(){
       $('input[type="button"').remove();
       var num = $('.user-list li').length;
       $('#total-subscribed').css('opacity','1').empty().append(num)

       if(num>15){
        $('#showMore').css('display','block !important')
      }
      else{
        $('#showMore').css('display','none')
      }

    }, 150)
      
    }
  }, 100);

  console.log('Dribbble Paris Meetup <http://dribbble.paris-meetup.com>')
  console.log('Coded with love, by @LukyVj <lucas.bonomi@gmail.com>')
  console.log('Design by @KevinCdnc <Kevin.cudennec@gmail.com>')
  console.log('A Rocket-Design collaboration <http://rocket-design.fr>')
}


function addArobaze(){
  $('input[type="text"]').on('click blur', function(){
    if(!$(this).val()){
      $(this).attr('value','@');
      $(this).selectRange(1);
    }
  })
}

function getUserName(){
  $('input[type="text"]').on('blur', function(){
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
function ponyTail(){
  $.ajax({
    type: 'POST',
    url: "https://mandrillapp.com/api/1.0/messages/send.json",
    data: {
      'key': 'Ue5cb6wINC5oMkQ8LRISSQ',
      'message': {
        'from_email': 'hello@rocket-design.fr',
        'to': [
        {
          'email': $('input[type="email"]').val(),
          'name': $('input[type="text"]').val(),
          'type': 'to'
        }
        ],
        'autotext': 'true',
        'subject': 'QR Code | Paris Dribbble Meetup',
        'html': 'Bonjour, <strong>'+$('input[type="text"]').val().replace('@','')+'</strong>. <br/>Merci pour votre participation au <strong>Paris Dribbble Meetup #1</strong>.<br/><br/> Voici votre <strong>QRCode</strong> unique personel :<br/> <img src="'+$('#ponytag').val()+'" /><br/>( <i><a href="'+$('#ponytag').val()+'"> Ou cliquez ce lien si l\'image ne s\'affiche pas</a></i> )  <br/><br/>Vous devrez vous présenter à l\'évènement, muni de ce document. <br/><br/> Nous vous tiendrons informés de la date et du lieu par mail, ainsi que sur le site <a href="http://dribbble.paris-meetup.com/20115">http://dribbble.paris-meetup.com/20115</a> <br/><br/>AC - KC - LB'
      },
      'headers': {
        'Reply-To': 'hello@rocket-design.fr'
      },
      'auto_html': true,
      'inline_css': true
    }
  }).done(function(response) {
    $('#mailback').empty().append('<h4>Un email contenant votre identifiant viens de vous être envoyé</h4> <h4><small>Nous vous tiendrons informés de la date et du lieu par email.</small></h4>')
   console.log(response); // if you're into that sorta thing
 });
};

function emailDetection(){
  $('input[type="email"]').on('blur', function(){
    var emailAddress = $(this).val();
    if( isValidEmailAddress( emailAddress ) ) { 
      $(this).closest('fieldset').addClass('done');
      $('input[type="checkbox"]').prop('disabled', false);
    }
  })
}

function datePicker(){
  $('input[type="checkbox"]').on('click', function(){

    setTimeout(function(){
      $('input[type="button"]').prop('disabled', false).addClass('activated');
    }, 250)

    if($('#jeudi-25-juin').is(':checked')){
      $('#dates').attr('value','jeudi-25-juin')
    }
    if($('#vendredi-26-juin').is(':checked')){
      $('#dates').attr('value','vendredi-26-juin')
    }
    if($('#jeudi-25-juin').is(':checked') && $('#vendredi-26-juin').is(':checked')){
      $('#dates').attr('value','jeudi / vendredi')
    }

  })
}

function confirmFirstStep(){
  $('input[type="button"]').on('click', function(e){
    e.preventDefault();

    $("#inscription").addClass('hidden');
    $("#load").removeClass('hidden');

    tokenize();
    setTimeout(function(){
      $("#thankyou").removeClass('hidden');
      $(".user-subscribed img").removeClass('twisted');
      $("#load").addClass('hidden');
    }, 1258)

    setupThankyou();
  })

  function setupThankyou(){
    var userName = $('input[type="text"]').val();
    var userEmail = $('input[type="email"]').val();
    var userImage = $('#detector').val();
    var uniqueUrl = $('#ponytag').val();
    var selectedDates = $('#dates').val();

    $('#userName').empty().append(userName);
    $('#userImage').attr('src', userImage);

    if(!inDevelopement){
    // Push user data to firebase
    var usersRef = new Firebase('https://dbbb-parismeetup.firebaseio.com/atendees');


    function checkIfUserExists (userId) {

      usersRef.once('value', function(snapshot) {

        var attendees = snapshot.val();
        for (var a in attendees) {

          var attendee = attendees[a];

          if(attendee.name === userId) {

            userExistsCallback(userId, attendee);
            return true;
          }
          else{
            userExistsCallback(userId, false);
            return false; 
          }

        }

      });

    }

    function go() {
      var userId = userName;
      checkIfUserExists(userId);
    }

    function userExistsCallback(userId, exists) {

     if (exists) {
      alert('Vous êtes déjà dans la liste');
      console.log('exists')
      exists.stopPropagation();
    }
    else {
      console.log('dont exist yo');

      usersRef.push({
        name: userName, 
        avatar: userImage, 
        email: userEmail, 
        dates: selectedDates,
        qrCode: uniqueUrl   
      });

      ponyTail();

         // Set a cookie to avoid the user to readd his email
         $.cookie('alreadyIn', '1', { expires: 365 });
         $.cookie('userName', userName , { expires: 365 });
         $.cookie('userImage', userImage , { expires: 365 });


         setTimeout(function(){
          loadBase();
        }, 200);

         setTimeout(function(){
           var num = $('.user-list li').length;
           $('#total-subscribed').css('opacity','1').empty().append(num);

           if(num>15){
            $('#showMore').css('display','block')
          }
          else{
            $('#showMore').css('display','none')
          }
        }, 500)
       }
     }


     go();       
   }
 }
}

function showMore(){
  var iLength = $('li').length;
  var iHeight = 55.55;
  var fHeight = iHeight * iLength;

  $('#showMore').on('click', function(e){
    e.preventDefault();
    if($(this).text()=='Voir tous ...'){
      $(this).empty().append('Voir moins..');
      $('.user-list').animate({
        height: fHeight +'px',
      }, 0, function() {}).css('overflow','auto');
    }
    else{
      $(this).empty().append('Voir tous ...');
      $('.user-list').removeClass('open');
      $('.user-list').animate({
        height: "210px",
        scrollTop: 0
      }, 0, function() {}).css('overflow','hidden');
      $('.user-list ul').animate({ scrollTop: 0}, 800, 'swing');
    }
  })
}



function form(){
  inputIndex();
  addArobaze();
  getUserName();
  emailDetection();
  datePicker();
  confirmFirstStep();
}

function deploy(){
  init();
  form();
  showMore();
};


$(document).ready(function(){
  deploy()
});