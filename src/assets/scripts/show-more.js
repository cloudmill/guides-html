$(() => {
  const button = $('[data-button-show]')

  if (button.length) {

    button.each(function() {
      let isShowed = false
      const text = $(this).text()
      $(this).on('click', function() {
  
        if (isShowed) {
          $(this).text(text)
        } else {
          $(this).text('Hide')
        }
  
        isShowed = !isShowed
      })
    })
  }
})