import { mediaQuery } from './mediaQueries.js'

const FPS = 60

$(window).on('load', function() {
  if (mediaQuery.matches) {
    
    update()
    scrollHandler()

    function update() {
      const footerHeight = $('.footer').innerHeight()
      $('.main').css('margin-bottom', `${footerHeight}px`)
    }

    const handeResize = (() => {
      let enabled = true

      return () => {
        if (enabled) {
          enabled = false

          update()

          setTimeout(() => enabled = true, 1000 / FPS)
        }
      }
    })()

    function scrollHandler() {
      // const scrollBottom = this.pageYOffset + $(window).height() 
      const scrollBottom = window.pageYOffset + $(window).height() 
      const mainHeight = $('.main').innerHeight()
      const footerHeight = $('.footer').innerHeight()

      if (scrollBottom > mainHeight) {
        const fadeToggle = ((scrollBottom - mainHeight) / footerHeight) 

        requestAnimationFrame(() => {
          $('.footer__overlay').css('opacity', (1 - fadeToggle) * 0.75);
        })
      }
    }
    

    window.addEventListener('resize', handeResize)
    // if (!$('.contacts-page').length) { // ?
      window.addEventListener('scroll', scrollHandler)
    // } else {
    //   $('.footer__overlay').css('opacity', '0');
    // }
  }
})