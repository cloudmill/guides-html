$(() => {
  if ($('.admin').length) {
    const button = $('[data-admin-save]')
    let isErrorsExist = false

    button.on('click', function() {
      setTimeout(() => {
        const errors = $('.parsley-error')
        const ERROR_TEXT = "Сохранить не удалось. Есть незаполненые поля"

        if (isErrorsExist) {
          $('.custom-error').remove()
          isErrorsExist = false
        }

        if (errors.length) {
          let arr = []

          errors.each(function() {
            const tabIndex = $(this).closest('.admin__tab').index()
  
            if (!arr.includes(tabIndex)) {
              arr.push(tabIndex)
              const error = document.createElement('div')

              $(error).addClass('custom-error')
              $(error).text(ERROR_TEXT)
              $('.product-tabs__item').eq(tabIndex).prepend($(error))
            }
          })
          isErrorsExist = true
        }
      }, 100);
    })
  }
})