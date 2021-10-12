

$(() => {
  const file = $('[data-file-input]') 
  
  if (file.length) {
    file.each(function() {
      const ths = $(this)
      const inputFile = ths.find('.file__input');
      const fileName = ths.find('.file__name')
      const fileButton = ths.find('.file__button')

      inputFile.on('change', function() {
        const name = this.files[0].name

        fileName.text(name)
        ths.addClass('file--downloaded')
      })

      fileButton.on('click', function() {
        ths.removeClass('file--downloaded')
      })
    })
  }
});