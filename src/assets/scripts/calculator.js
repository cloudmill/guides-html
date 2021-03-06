import {mediaQuery} from './mediaQueries'

// please calculate tooltip show/hide
{
  $(() => {
    const tooltips = $('[data-calculator-tooltip]')

    if (tooltips.length) {
      const button = $('[data-calculator-calculate]')
      const prices = $('[data-calculator-price]')

      button.on('click', function() {
        tooltips.addClass('hidden')
        prices.removeClass('hidden')
      })
    }
  })
}

{
  $(() => {
    if (mediaQuery.matches) {
      $('.calculator__desktop').addClass('active')
    } else {
      $('.calculator__mobile').addClass('active')
    }
  })
}