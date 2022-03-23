import { mediaQuery } from './mediaQueries.js'

$(window).on('load', () => {
  const headerOffset = $('.header').height() + 10

  if ($('[data-nav-page]').length && mediaQuery.matches) {
    const FPS = 60

    const navLink = $('.nav-page__link')
    const items = $('.nav-page__item')

    let positions = [],
    currentActive = null,
    links = navLink;

    // update offset
    upadateOffset()
    $(window).one('resize', handleResize)

    function upadateOffset() {
      positions.length = 0
      $('[data-section]').each(function(){
        positions.push({
          top: $(this).offset().top,
          a: links.filter('[data-scroll="#'+$(this).attr('id')+'"]').closest('.nav-page__item')
        });
      });

      positions = positions.reverse();
    }

    function handleResize() {
      setTimeout(() => {
        upadateOffset()

        $(window).one('resize', handleResize)
      }, 1000 / FPS);
    }

    

    // scroll active change
    updateActive()
    $(window).one('scroll', scrollHandler)

    function updateActive() {
      const winTop = $(window).scrollTop()

      for(let i = 0; i < positions.length; i++){
        if(positions[i].top - headerOffset < winTop + headerOffset){
          if(currentActive !== i){
            currentActive = i;
            items.removeClass('nav-page__item--active');
            positions[i].a.addClass('nav-page__item--active');
          }
          break;
        }
      }

      if (positions[positions.length - 1].top - headerOffset > winTop + headerOffset) {
        items.removeClass('nav-page__item--active');
        positions[positions.length - 1].a.addClass('nav-page__item--active')
      }
    }

    function scrollHandler() {
      setTimeout(() => {
        updateActive()

        $(window).one('scroll', scrollHandler)
      }, 1000 / FPS);
    }

    
  }

  // anchor scroll
  if ($('[data-scroll]').length) {
    $('[data-scroll]').on('click', function(event) {
      event.preventDefault();

      const elementId = $(this).data('scroll');
      const elementOffset = $(elementId).offset().top;

      $('html, body').animate({
        scrollTop: elementOffset - headerOffset
      }, 700);
    })
  }
})