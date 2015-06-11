$(function() {
  var e = new Firebase("https://dbbb-parismeetup.firebaseio.com/atendees");
  e.on("child_added", function(e) {
    var a = e.val();
    $("ul#list").append('<li><a href="http://dribbble.com/' + a.name.replace("@", "") + '" target="_blank"><img src="' + a.avatar + '" /></a></li>');

    setTimeout(function() {
      $("#howmuch").empty().fadeIn().append($("#list li").length);
    }, 2000)
  }, function(e) {
    console.log("The read failed: " + e.code)
  });

  
});