document.querySelector(".main-img").classList.add("active");
setTimeout(function(){
  document.querySelector(".main-header-text").classList.add("active");
  document.querySelector(".slogan").classList.add("active");
}, 500);

function membersToArray(members) {
  let arrayOfObjects = Object.keys(members).map(key => {
    let array = members[key]
    array.key = key
    return array
  });
  return arrayOfObjects;
}
