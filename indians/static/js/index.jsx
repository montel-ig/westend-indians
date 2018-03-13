function objectToArray(obj) {
  let arrayOfObjects = Object.keys(obj).map(key => {
    let array = obj[key]
    array.key = key
    return array
  })
  return arrayOfObjects
}

// shameless rip from https://stackoverflow.com/questions/17733076/smooth-scroll-anchor-links-without-jquery
function scrollTo(element, to, duration) {
  if(duration <= 0) return
  let difference = to - element.scrollTop
  let perTick = difference / duration * 10
  
  setTimeout(function() {
    element.scrollTop = element.scrollTop + perTick
    if(element.scrollTop === to) return
    scrollTo(element, to, duration - 10)
  }, 10)
}

(function init() {
  document.querySelector(".main-img").classList.add("active")

  setTimeout(function() {
    document.querySelector(".main-header-text").classList.add("active-transform")
    if(document.querySelector(".slogan")) {
      document.querySelector(".slogan").classList.add("active-fadein")
    }
  }, 800)

  setTimeout(function() {
    document.querySelector(".main-header-text").classList.add("shadows")
  }, 2000)
  
  console.log('adding scroll to links')
  for(let elem of document.querySelectorAll('.scroll-to-link')) {
    elem.addEventListener('click', function(e) {
      try {
        scrollTo(document.documentElement, document.querySelector(e.target.dataset.href).offsetTop, 420)
        e.preventDefault()
        return false
      } catch(e) {
        console.log('scroll-to failed', e)
      }
    })
  }

})()