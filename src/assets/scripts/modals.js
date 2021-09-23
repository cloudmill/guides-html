import '@fancyapps/fancybox';

// fancybox
{
  $(() => {
    $.fancybox.defaults.closeExisting = true;
    $.fancybox.defaults.touch = false;
    $.fancybox.defaults.baseTpl = (
      '<div class="fancybox-container" role="dialog" tabindex="-1">' +
      '<div class="fancybox-bg"></div>' +
      '<div class="fancybox-stage"></div>' +
      '</div>'
    )

    $('[data-fancy-button]').on('click', function (event) {
      event.preventDefault();

      const id = $(this).data('fancy-button');
      const modal = $(`[data-fancy-modal="${id}"]`);

      $.fancybox.open(modal);
    });
  });
}