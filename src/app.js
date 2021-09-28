import 'Styles/_app.scss'
import tippy from 'tippy.js';

import 'scripts/swipers.js';
import 'scripts/header.js';
import 'scripts/modals.js';
import 'scripts/accordion.js';
import 'scripts/select.js';
import 'scripts/nav-links.js';
import 'scripts/sticky.js';
import 'scripts/data-picker.js';
import 'scripts/form-response.js';


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

// tooltip
{
  $(() => {
    $('.tooltip').each(function() {
      const tooltipContent = $(this).find('.tooltip__container').text().trim();
      const tooltipMark = $(this).find('.tooltip__icon');

      tippy(tooltipMark[0],  {
        content: tooltipContent,
        // trigger: 'click',
        appendTo: $('.main')[0],
        offset: [0, 6],
      });
    });
  });
}