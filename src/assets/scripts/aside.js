


$(() => {
  const aside = $('.aside')

  if (aside.length) {
    const select = aside.find('.aside__input')
    const checkbox = aside.find('.aside__input')

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
  }
})