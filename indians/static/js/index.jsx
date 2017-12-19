document.querySelector(".main-img").classList.add("active");
setTimeout(function(){
  document.querySelector(".main-header-text").classList.add("active");
  document.querySelector(".slogan").classList.add("active");
}, 500);

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
