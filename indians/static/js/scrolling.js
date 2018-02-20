(function() {

  let SECTION_LOCATIONS = []

  function getSectionHeights() {
    let l = []
    document.querySelectorAll('section').forEach(function(sect) {
      l.push([sect.offsetTop, sect.offsetTop + sect.clientHeight, sect])
    })
    return l
  }

  function resizeHandler() {
    SECTION_LOCATIONS = getSectionHeights()
  }

  function scrollHandler() {
    const st = window.pageYOffset
    // st > 240 ? document.body.addClass('fixed-menu') : $BODY.removeClass('fixed-menu')
    const screenMidPoint = window.innerHeight / 2 + st
    // console.log('screen mid point', screenMidPoint)
    for(let sl of SECTION_LOCATIONS) {
      // if(sl[0] < screenMidPoint && screenMidPoint < sl[1]) {
      if(sl[0] < screenMidPoint) {
        //          if(i == 0) {
        //            $BODY.addClass('at-top');
        //          } else {
        //            $BODY.removeClass('at-top');
        //          }
        const elem = sl[2]
        if(!elem.classList.contains('in-focus')) {
          // console.log('in focus', elem)
          // elem.classList.remove('in-focus')
          setTimeout(function() {
            elem.classList.add('in-focus')
            elem.classList.remove('to-be-revealed')
          }, 0)
          // return false;
        }
      }
    }
  }

  // console.log('Scrolling listener')

  document.addEventListener('resize', resizeHandler)
  document.addEventListener('scroll', scrollHandler)

  resizeHandler()
  scrollHandler()

})()
