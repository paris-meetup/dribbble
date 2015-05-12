function _import (src, debug, finished) {

  var httpRequest,
  start_time = new Date().getTime();

  if (window.XDomainRequest) {
    httpRequest = new XDomainRequest();
  } else if (window.XMLHttpRequest) {
    httpRequest = new XMLHttpRequest();
  } else if (window.ActiveXObject) {
    httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
  }

  httpRequest.onload = loaded;
  httpRequest.onerror = error;
  
  httpRequest.open('GET', src);
  httpRequest.send();
  
  function error () {
    console.log('Error');
  }
  
  function loaded () {

    var js = httpRequest.responseText;
    
    window.eval(js);
    
    if (finished && typeof(finished) == "function") {
      var scb = document.createElement("span");
      scb.setAttribute("id", "import_varfile");
      scb.setAttribute("value", "import_varfile");
      scb.innerHTML = "IMPORT_VARFILE :"
      document.head.appendChild(scb);
      var tb = scb.textContent;

      if(debug === true){
        var request_time = new Date().getTime() - start_time;
        var i = 2;
        finished();
      }
      else{
        finished();
      }
    }
  } 
}