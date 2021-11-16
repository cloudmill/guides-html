
// scroll
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

      if ($('[data-header-transparent]').length) {
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

// header modals
{
  const button = $('[data-modal-button]')
  let modalName
  const searchInput = $('.header__mobile').find('.header__search-input')

  button.on('click', function() {
    const buttonId = $(this).data('modal-button')
    modalName = 'header--' + buttonId

    $('.header').toggleClass(modalName)
    
    if (buttonId === 'search') {
      searchInput.focus()
    }

    if (!(buttonId === 'search')) {
      $('.body').toggleClass('body--overflow')
    }
  })

  $(window).on('click', function (event) {
    const target = $(event.target);

    if (!target.closest('.header__modals').length && !target.closest(button).length) {
      $('.header').removeClass(modalName)
      $('.body').removeClass('body--overflow')
    }
  });
}