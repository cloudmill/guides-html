


$(() => {
  const aside = $('.aside')

  if (aside.length) {
    const checkbox = aside.find('.aside__input')
    const dropdown = aside.find('.aside__dropdown')
    const button = $('.aside-button')
    

    checkbox.on('change', function() {
      const item = $(this).closest('.aside__item')
      const itemLabel = item.find('.aside__select')
      const itemCheckbox = item.find('.aside__input')

      itemCheckbox.each(function() {
        if (this.checked === true) {
          itemLabel.removeClass('disabled')
          return false
        } else {
          itemLabel.addClass('disabled')
        }
      })
    })
    
    let arr = []
    const select = $('[data-aside-select]')
    // let isOpen
    
    button.on('click', function() {
      // accordion toggle
      aside.toggleClass('active')
      // isOpen = true
      dropdown.slideToggle()

      // if (isOpen)  {
      //   isOpen = false
        if (select.val() !== null) {
          arr.push(select.val())
        }
        
        checkbox.each(function() {
          if (this.checked === true) {
            arr.push($(this).siblings('.aside__text').text());
          }
        })
  
        if (arr.length) {
          $('.aside-button__text').text(arr.join(', '))
        }
        arr = []
      // }
    })
  }
})