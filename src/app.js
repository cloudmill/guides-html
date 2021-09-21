import 'Styles/_app.scss'

import Swiper from 'swiper/bundle';
import '@fancyapps/fancybox';


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

        switch (slider_id) {
          case 10:
            slider_options = {
              // ...slider_options,

              breakpoints: {
                // [BREAKPOINT]: {
                //   spaceBetween: 60,
                // },
              },
            }
            break;

        }

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

// indvidual excursions
{
	$(() => {
		// thumb slider
		{
			const SPEED = 600;

			const slider = $('.thumb-slider');

			if (slider.length !== 0) {
				const thumbsSwiperEl = slider.find('.thumb-slider__thumbs');
        
				const thumbsSwiper = new Swiper(thumbsSwiperEl[0], {
					speed: SPEED,
					slidesPerView: 'auto',
					spaceBetween: 10,
				});

				const thumbsSlide = slider.find('.thumb-slider__thumb');

				const sliderSwiperEl = slider.find('.swiper-container');
				const sliderSwiper = new Swiper(sliderSwiperEl[0], {
					speed: SPEED,
				});

        const buttonPrev = slider.find('.slider-buttons__button--left')
        const buttonNext = slider.find('.slider-buttons__button--right')

				// control
				let lastAction = 'nothing';
				sliderSwiper.on('sliderFirstMove', () => {
					lastAction = 'slider swipe';
				})
				thumbsSwiper.on('click', event => {
					lastAction = 'thumbs click';

					sliderSwiper.slideTo(event.clickedIndex);

					thumbsSlide.removeClass('thumb-slider__thumb--active');
					thumbsSlide.eq(event.clickedIndex).addClass('thumb-slider__thumb--active');
				});

        buttonPrev.on('click', function() {
          lastAction = 'slider swipe'
          sliderSwiper.slidePrev()
        })

        buttonNext.on('click', function() {
          lastAction = 'slider swipe'
          sliderSwiper.slideNext()
        })

				sliderSwiper.on('slideChange', event => {
					if (lastAction === 'slider swipe') {
						thumbsSwiper.slideTo(event.realIndex);

						thumbsSlide.removeClass('thumb-slider__thumb--active');
						thumbsSlide.eq(event.realIndex).addClass('thumb-slider__thumb--active');
					}

					lastAction = 'nothing';
				});
			}
		}
	});
}

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

// header
{
  $(() => {
    const header = $('.header')

    const fps = 120

    let scrollTop = $(window).scrollTop()

    $(window).one('scroll', scroll)

    function scroll() {
      update()

      setTimeout(() => {
        update()

        $(window).one('scroll', scroll)
      }, 1000 / fps)
    }

    function update() {
      const newScrollTop = $(window).scrollTop()

      if (Math.abs(scrollTop - newScrollTop) >= 1) {
        if (newScrollTop > scrollTop) {
          header.addClass('header--up')
        } else {
          header.removeClass('header--up')
        }
      }

      if (scrollTop < 1) {
        header.removeClass('header--up')
      }

      if ($('.page-transparent').length) {
        if (scrollTop < 1) {
          header.addClass('header--transparent')
        } else {
          header.removeClass('header--transparent')
        }
      }

      scrollTop = newScrollTop
    }
  });
}

// accordion
{
  $(() => {

    if ($('[data-accordion]').length) {
      window.addEventListener('click', (e) => {
        const accordion = $('[data-accordion]')
        const target = $(e.target)

        if (target.closest('[data-accordion-button]').length) {
          target.closest(accordion).toggleClass('active');
          target.closest(accordion).find('[data-accordion-dropdown]').slideToggle()
        }
      })
    }
  })
}

// fancybox
{
  $(() => {
    $.fancybox.defaults.closeExisting = true;
    $.fancybox.defaults.touch = false;
    $.fancybox.defaults.baseTpl = (
      '<div class="fancybox-container" role="dialog" tabindex="-1">' +
      '<div class="fancybox-bg"></div>' +
      '<div class="fancybox-stage"></div>' +
      '</div>'
    )

    $('[data-fancy-button]').on('click', function (event) {
      event.preventDefault();

      const id = $(this).data('fancy-button');
      const modal = $(`[data-fancy-modal="${id}"]`);

      $.fancybox.open(modal);
    });
  });
}