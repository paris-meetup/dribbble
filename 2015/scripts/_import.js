function _import(e,t,n){function i(){}function o(){var e=r.responseText;if(window.eval(e),n&&"function"==typeof n){var i=document.createElement("span");i.setAttribute("id","import_varfile"),i.setAttribute("value","import_varfile"),i.innerHTML="IMPORT_VARFILE :",document.head.appendChild(i);i.textContent;if(t===!0){(new Date).getTime()-a;n()}else n()}}var r,a=(new Date).getTime();window.XDomainRequest?r=new XDomainRequest:window.XMLHttpRequest?r=new XMLHttpRequest:window.ActiveXObject&&(r=new ActiveXObject("Microsoft.XMLHTTP")),r.onload=o,r.onerror=i,r.open("GET",e),r.send()}