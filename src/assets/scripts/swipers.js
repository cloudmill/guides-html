import Swiper from 'swiper/bundle';

const BREAKPOINT = 1280;
const BREAKPOINT_MOBILE = 768

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

          spaceBetween: 20,

          breakpoints: {
            [BREAKPOINT]: {
              spaceBetween: 40,
            },
          },
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
          case 'team':
            slider_options = {
              ...slider_options,

              spaceBetween: 10,

              breakpoints: {
                [BREAKPOINT_MOBILE]: {
                  spaceBetween: 20,
                },
                [BREAKPOINT]: {
                  spaceBetween: 40,
                },
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

// thumb slider
{
	$(() => {
		
		{
			const SPEED = 600;

			const slider = $('.thumb-slider');

			if (slider.length) {
        const images = slider.find('.thumb-slider__slide-img')

        if (images.length > 1) {
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
        } else {
          slider.addClass('static')
        }
			}
		}
	});
}
