

$(() => {
  const aside = $('.aside')

  if (aside.length) {
    const checkbox = aside.find('.aside__input')

    // checkbox.on('change', function() {
    //   const item = $(this).closest('.aside__item')
    //   const itemLabel = item.find('.aside__select')
    //   const itemCheckbox = item.find('.aside__input')

    //   itemCheckbox.each(function() {
    //     if (this.checked === true) {
    //       itemLabel.removeClass('disabled')
    //       return false
    //     } else {
    //       itemLabel.addClass('disabled')
    //     }
    //   })
    // })
    
    // Количество выбранных фильтров
    const select = $('[data-aside-select]')

    if (select.length) {
      let arr = []
      let isOpen = true
      const buttonText = $('.aside-button__text').text()
      
      // from accordion.js
      window.addEventListener('accordion-toggle', function () {
        isOpen = !isOpen
  
        if (!isOpen) {
  
          if (select.val()) {
            arr.push(select.val())
          }
          
          checkbox.each(function() {
            if (this.checked === true) {
              arr.push($(this).siblings('.aside__text').text());
            }
          })
    
          if (arr.length) {
            $('.aside-button__text').text(arr.length)
          }
  
          arr = []
  
        } else {
          $('.aside-button__text').text(buttonText)
        }
      });
    }

    // clear button
    const clearButton = aside.find('[data-clear-button]')

    clearButton.on('click', function() {
      checkbox.prop('checked', false)
      $('.aside__select').addClass('disabled')
    })
  }
})