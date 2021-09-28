

$(() => {
  const tab = $('[data-hero-tab]')
  
  tab.on('mouseenter', function() {
    const id = $(this).data('hero-tab')
    const frame = $(`[data-hero-frame=${id}]`)

    frame.removeClass('hero__frame--hidden')
    frame.addClass('hero__frame--front')
  })

  tab.on('mouseleave', function() {
    const id = $(this).data('hero-tab')
    const frame = $(`[data-hero-frame=${id}]`)

    frame.removeClass('hero__frame--front')
    frame.addClass('hero__frame--hidden')
  })
})
