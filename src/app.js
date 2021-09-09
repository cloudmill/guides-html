import 'Styles/_app.scss'

import Swiper from 'swiper/bundle';


// swiper 
{
  $(window).on('load', () => { // ?
    const slider = $('[data-slider-id]');

    if (slider.length !== 0) {
      slider.each(function () {
        const slider_el = $(this);
        const slider_id = slider_el.data('slider-id');
        const slider_prev_id = slider_el.data('slider-prev');
        const slider_next_id = slider_el.data('slider-next');
        const slider_prev = $(`[data-slider-button="${slider_prev_id}"]`);
        const slider_next = $(`[data-slider-button="${slider_next_id}"]`);

        let slider_options = {
          slidesPerView: 'auto',

          spaceBetween: 40,
          // loop: true,

          // breakpoints: {
          //   [BREAKPOINT]: {
          //     spaceBetween: 30,
          //   },
          // },
        };

        // switch (slider_id) {
        //   case 1:
        //     slider_options = {
        //       ...slider_options,

        //       breakpoints: {
        //         [BREAKPOINT]: {
        //           spaceBetween: 60,
        //         },
        //       },
        //     }
        //     break;

        // }

        const slider_swiper = new Swiper(slider_el[0], slider_options);

        slider_prev.on('click', () => {
          slider_swiper.slidePrev();
        });
        slider_next.on('click', () => {
          slider_swiper.slideNext();
        });
      });
    }
  });
}