import 'Styles/_app.scss'

import 'scripts/swipers.js';
import 'scripts/header.js';
import 'scripts/tooltip.js';
import 'scripts/modals.js';
import 'scripts/accordion.js';
import 'scripts/select.js';
import 'scripts/nav-links.js';
import 'scripts/sticky.js';
import 'scripts/parsley.js';
import 'scripts/hero.js';
import 'scripts/footer.js';
import 'scripts/data-picker.js';
import 'scripts/form-response.js';
import 'scripts/table.js';
import 'scripts/aside.js';


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

