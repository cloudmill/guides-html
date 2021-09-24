import 'Styles/_app.scss'

import 'scripts/swipers.js';
import 'scripts/header.js';
import 'scripts/modals.js';
import 'scripts/accordion.js';
import 'scripts/select.js';
import 'scripts/nav-links.js';
import 'scripts/sticky.js';
import 'scripts/data-picker.js';


// counter
{
  $(() => {
    const counter = $('.counter')

    if (counter.length) {

      counter.each(function() {
        const ths = $(this)
        const counterPlus = ths.find('.counter__item--plus')
        const counterMinus = ths.find('.counter__item--minus')
        const number = ths.find('.counter__number')

        counterPlus.on('click', function() {
          number.text(+number.text() + 1)
        })

        counterMinus.on('click', function() {
          if (number.text() > 0) {
            number.text(+number.text() - 1)
          }
        })
      })
    }
  })
}