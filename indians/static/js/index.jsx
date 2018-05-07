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
    document.querySelector("#page-header > *").classList.add("active-transform")
    if(document.querySelector(".slogan")) {
      document.querySelector(".slogan").classList.add("active-fadein")
    }
  }, 800)

  setTimeout(function() {
    document.querySelector("#page-header > *").classList.add("shadows")
  }, 2000)

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

  // Passive event support detection / https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md
  // Test via a getter in the options object to see if the passive property is accessed
  let supportsPassive = false
  try {
    let opts = Object.defineProperty({}, 'passive', {
      get: function() {
        supportsPassive = true
      }
    })
    window.addEventListener("testPassive", null, opts)
    window.removeEventListener("testPassive", null, opts)
  } catch(e) {
  }

  // Mobile menu magic
  const mobileMenu = document.querySelector('#mobile-nav')
  const hamburger = mobileMenu.querySelector(".hamburger")
  const closeButton = mobileMenu.querySelector(".close")
  const openMenu = () => {
    mobileMenu.classList.add('open')
  }
  const closeMenu = () => {
    mobileMenu.classList.remove('open')
  }

  // with chrome webdev responsive view these cause a peculiar bug where frontpage loads after every click
  // only nice to have, so disabling
  // hamburger.addEventListener('touchstart', openMenu, supportsPassive ? {passive: true} : false)
  // closeButton.addEventListener('touchstart', closeMenu, supportsPassive ? {passive: true} : false)

  hamburger.addEventListener('click', openMenu, supportsPassive ? {passive: true} : false)
  closeButton.addEventListener('click', closeMenu, supportsPassive ? {passive: true} : false)

  const menu1992 = document.querySelector('#menu-1992')
  const menuButton1992 = document.querySelector('#menu-button-1992')
  const toggle1992Menu = () => {
    if(menu1992.classList.contains('open')) {
      menu1992.classList.remove('open')
    } else {
      menu1992.classList.add('open')
    }
  }
  menuButton1992.addEventListener('click', toggle1992Menu, supportsPassive ? {passive: true} : false)


})()