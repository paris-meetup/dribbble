function formatTimeOfDay(e){var t=e/1e3|0,n=(t%86400+86400)%86400,o=n%60,i=(n/60|0)%60,a=n/3600|0;return a+(10>i?":0":":")+i+(10>o?":0":":")+o}function freshStyle(e){setTimeout(function(){$("#list").attr("href",e)},150)}function inputIndex(){var e=0;$("input").each(function(){e++,$(this).attr("tabindex",e)})}function tokenize(){var e="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=",t=Math.random().toString(36).substr(2),n=Date.now(),o=t+t+n;$("#ponytag").attr("value",e+n+"ParisDribbbleMeetup - "+$('input[type="text"]').val()),$("#token").attr("value",o)}function loadBase(){var e=new Firebase("https://dbbb-parismeetup.firebaseio.com/atendees");e.on("child_added",function(e){var t=e.val();console.log(t.name),$(".user-list ul").empty(),setTimeout(function(){$(".user-list ul").append('<li><a href="http://dribbble.com/'+t.name.replace("@","")+'" target="_blank"><img src="'+t.avatar+'" /></a></li>'),freshStyle(restyled),getAtendeeLength()},200)},function(e){console.log("The read failed: "+e.code)})}function getAtendeeLength(){var e=$(".user-list li").length;$("#total-subscribed").empty().append(e)}function init(){$("#showMore").css("display","block !important"),$('input[type="button"],input[type="email"],input[type="checkbox"]').prop("disabled",!0),setTimeout(function(){"1"==$.cookie("alreadyIn")&&($("body").addClass("washere"),$(".user-subscribed img").removeClass("twisted"),$("#userImage").attr("src",$.cookie("userImage")),$("#userName").empty().append($.cookie("userName")))},100),console.log("Dribbble Paris Meetup <http://dribbble.paris-meetup.com>"),console.log("Coded with love, by @LukyVj <lucas.bonomi@gmail.com>"),console.log("Design by @KevinCdnc <Kevin.cudennec@gmail.com>"),console.log("A Rocket-Design collaboration <http://rocket-design.fr>"),console.log("Contributions to Code by @dervondenbergen <felix@demont.is>")}function addArobaze(){$('input[type="text"]').on("click blur",function(){$(this).val()||($(this).attr("value","@"),$(this).selectRange(1))})}function getUserName(){$('input[type="text"]').on("blur",function(){var e=$(this),t=(e.val(),e.val().replace("@",""));fetchUserInformations(t)})}function fetchUserInformations(e){$.jribbble.getPlayerById(e,function(e){$("#detector").attr("value",e.avatar_url),$('input[type="text"]').closest("fieldset").addClass("done"),$('input[type="email"]').prop("disabled",!1)})}function isValidEmailAddress(e){var t=new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);return t.test(e)}function ponyTail(){$.ajax({type:"POST",url:"https://mandrillapp.com/api/1.0/messages/send.json",data:{key:"Ue5cb6wINC5oMkQ8LRISSQ",message:{from_email:"hello@rocket-design.fr",to:[{email:$('input[type="email"]').val(),name:$('input[type="text"]').val(),type:"to"}],autotext:"true",subject:"QR Code | Paris Dribbble Meetup",html:"Bonjour, <strong>"+$('input[type="text"]').val().replace("@","")+'</strong>. <br/>Merci pour votre participation au <strong>Paris Dribbble Meetup #1</strong>.<br/><br/> Voici votre <strong>QRCode</strong> unique personel :<br/> <img src="'+$("#ponytag").val()+'" /><br/><i>Ticket généré le '+currentDate+'<br/>( <i><a href="'+$("#ponytag").val()+"\"> Ou cliquez ce lien si l'image ne s'affiche pas</a></i> )  <br/><br/>Vous devrez vous présenter à l'évènement, muni de ce document. <br/><br/> Nous vous attendons muni de ce ticket le <strong>vendredi 26 Juin</strong> a <strong>18h30</strong> dans les locaux de <strong><i>The Family</i>, 25 r Petit Musc, 75004 PARIS</strong>. <br/> <br/>Pour toute autres informations, veuillez visiter : <a href=\"http://dribbble.paris-meetup.com/2015\">http://dribbble.paris-meetup.com/2015</a> <br/><br/>AC - KC - LB"},headers:{"Reply-To":"hello@rocket-design.fr"},auto_html:!0,inline_css:!0}}).done(function(e){$("#mailback").empty().append("<h4>Un email contenant votre identifiant viens de vous être envoyé</h4> <h4><small>Nous vous tiendrons informés de la date et du lieu par email.</small></h4>"),console.log(e)})}function emailDetection(){$('input[type="email"]').on("blur",function(){var e=$(this).val();isValidEmailAddress(e)&&($(this).closest("fieldset").addClass("done"),setTimeout(function(){$('input[type="button"]').prop("disabled",!1).addClass("activated")},250))})}function confirmFirstStep(){function e(){function e(e){s.once("value",function(t){loadBase();var o=!1,i=t.val();for(var a in i){var r=i[a];if(r.name===e){o=r;break}}n(e,o)})}function t(){var t=o;e(t)}function n(e,t){t?console.log("exists"):(console.log("dont exist yo"),s.push({name:o,avatar:a,email:i,qrCode:r,created:currentDate+"-"+formatTimeOfDay($.now())}),ponyTail(),$.cookie("alreadyIn","1",{expires:365}),$.cookie("userName",o,{expires:365}),$.cookie("userImage",a,{expires:365}),setTimeout(function(){var e=$(".user-list li").length;$("#total-subscribed").css("opacity","1").empty().append(e),e>15?$("#showMore").css("display","block"):$("#showMore").css("display","none")},500))}var o=$('input[type="text"]').val(),i=$('input[type="email"]').val(),a=$("#detector").val(),r=$("#ponytag").val();$("#dates").val();if($("#userName").empty().append(o),$("#userImage").attr("src",a),!inDevelopement){var s=new Firebase("https://dbbb-parismeetup.firebaseio.com/atendees");t()}}$('input[type="button"]').one("click",function(t){t.preventDefault(),$("#inscription").addClass("hidden"),$("#load").removeClass("hidden"),tokenize(),setTimeout(function(){$("#thankyou").removeClass("hidden"),$(".user-subscribed img").removeClass("twisted"),$("#load").addClass("hidden")},1258),e()})}function showMore(){var e=$("li").length,t=55.55,n=t*e;$("#showMore").on("click",function(e){e.preventDefault(),"Voir tous ..."==$(this).text()?($(this).empty().append("Voir moins.."),$(".user-list").animate({height:n+"px"},0,function(){}).css("overflow","auto")):($(this).empty().append("Voir tous ..."),$(".user-list").removeClass("open"),$(".user-list").animate({height:"210px",scrollTop:0},0,function(){}).css("overflow","hidden"),$(".user-list ul").animate({scrollTop:0},800,"swing"))})}function form(){inputIndex(),addArobaze(),getUserName(),emailDetection(),confirmFirstStep()}function deploy(){init(),form(),showMore()}!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):"object"==typeof exports?module.exports=e(require("jquery")):e(jQuery)}(function(e){function t(e){return s.raw?e:encodeURIComponent(e)}function n(e){return s.raw?e:decodeURIComponent(e)}function o(e){return t(s.json?JSON.stringify(e):String(e))}function i(e){0===e.indexOf('"')&&(e=e.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\"));try{return e=decodeURIComponent(e.replace(r," ")),s.json?JSON.parse(e):e}catch(t){}}function a(t,n){var o=s.raw?t:i(t);return e.isFunction(n)?n(o):o}var r=/\+/g,s=e.cookie=function(i,r,u){if(arguments.length>1&&!e.isFunction(r)){if(u=e.extend({},s.defaults,u),"number"==typeof u.expires){var l=u.expires,c=u.expires=new Date;c.setMilliseconds(c.getMilliseconds()+864e5*l)}return document.cookie=[t(i),"=",o(r),u.expires?"; expires="+u.expires.toUTCString():"",u.path?"; path="+u.path:"",u.domain?"; domain="+u.domain:"",u.secure?"; secure":""].join("")}for(var d=i?void 0:{},p=document.cookie?document.cookie.split("; "):[],F=0,m=p.length;m>F;F++){var f=p[F].split("="),b=n(f.shift()),g=f.join("=");if(i===b){d=a(g,r);break}i||void 0===(g=a(g))||(d[b]=g)}return d};s.defaults={},e.removeCookie=function(t,n){return e.cookie(t,"",e.extend({},n,{expires:-1})),!e.cookie(t)}});var fullDate=new Date;console.log(fullDate);var twoDigitMonth=fullDate.getMonth()+"";1==twoDigitMonth.length&&(twoDigitMonth="0"+twoDigitMonth);var twoDigitDate=fullDate.getDate()+"";1==twoDigitDate.length&&(twoDigitDate="0"+twoDigitDate);var currentDate=twoDigitDate+"/"+twoDigitMonth+"/"+fullDate.getFullYear();console.log(currentDate);var inDevelopement=!1,myDataRef=new Firebase("https://dbbb-parismeetup.firebaseio.com/atendees"),restyled="styles/over-list.css",onComplete=function(e){console.log(e?"Synchronization failed":"Synchronization succeeded")};$.fn.selectRange=function(e,t){return t||(t=e),this.each(function(){if(this.setSelectionRange)this.focus(),this.setSelectionRange(e,t);else if(this.createTextRange){var n=this.createTextRange();n.collapse(!0),n.moveEnd("character",t),n.moveStart("character",e),n.select()}})},$(document).ready(function(){deploy()});