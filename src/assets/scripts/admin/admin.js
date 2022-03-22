
$(() => {
  const form = $('[data-admin-form]')

  if (form.length) {

    // ?
    form.on('submit', event => {
      event.preventDefault()
    })
  
    const MODAL_ID = 'admin123'
    const modal = $(`[data-fancy-modal="${MODAL_ID}"]`);
  
    form.parsley().on('form:submit', function() {
  
      $.fancybox.open(modal);
    })
  }
})