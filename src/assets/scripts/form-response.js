

$(() => {
  const form = $('[data-form]');

  if (form.length !== 0) {

    form.each(function() {
      const formButton = $(this).find('[data-form-button]');
      const formButtonId = formButton.data('form-button');

      $(this).on('submit', (e) => {
        e.preventDefault()

        $(`[data-form='${formButtonId}']`).attr('data-form-hidden', '');
        $(`[data-response='${formButtonId}']`).attr('data-response-active', '');
      })
    })

    const response = $('[data-response]');
    const responseButton = response.find('[data-response-button]');

    responseButton.on('click', function () {
      const responseButtonId = $(this).data('response-button');

      $(`[data-form='${responseButtonId}']`).removeAttr('data-form-hidden');
      $(`[data-response='${responseButtonId}']`).removeAttr('data-response-active');
    });
  }
});
