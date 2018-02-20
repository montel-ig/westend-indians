document.querySelector(".main-img").classList.add("active");

setTimeout(function(){
  document.querySelector(".main-header-text").classList.add("active-transform");
  if (document.querySelector(".slogan")) {
    document.querySelector(".slogan").classList.add("active-fadein");
  }
}, 800);

setTimeout(function() {
  document.querySelector(".main-header-text").classList.add("shadows");
}, 2000);

var activeMenuItem = function() {
  var url = location.href.split("/");
  var navLinks = window.document.getElementsByClassName("nav-link")
  var currentPage = url[url.length - 2];

  for(var i=0;i<navLinks.length;i++){
    var lb = navLinks[i].href.split("/");
    if(lb[lb.length-1] == currentPage) {
      navLinks[i].className = "current";
    }
  }
}();

function objectToArray(obj) {
  let arrayOfObjects = Object.keys(obj).map(key => {
    let array = obj[key]
    array.key = key
    return array
  });
  return arrayOfObjects;
}

function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}

