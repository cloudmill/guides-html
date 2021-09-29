import { mediaQuery } from './mediaQueries.js'

const FPS = 60

$(window).on('load', function() {
  if (mediaQuery.matches) {
    update()

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

    window.addEventListener('resize', handeResize)
  }
})