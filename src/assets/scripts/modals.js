import '@fancyapps/fancybox';
import { formReset } from './form-reset';

// fancybox
{
  $(() => {
    
    $.fancybox.defaults.closeExisting = true;
    $.fancybox.defaults.touch = false;
    $.fancybox.defaults.hideScrollbar = false;
    $.fancybox.defaults.baseTpl = (
      '<div class="fancybox-container" role="dialog" tabindex="-1">' +
      '<div class="fancybox-bg"></div>' +
      '<div class="fancybox-stage"></div>' +
      '</div>'
    );

    $('[data-fancy-button]').on('click', function (event) {
      event.preventDefault();

      const id = $(this).data('fancy-button');
      const modal = $(`[data-fancy-modal="${id}"]`);

      switch (id) {
        case "m1":
          $.fancybox.defaults.afterClose = formReset;
          break;
        default:
          $.fancybox.defaults.closeExisting = true;
          $.fancybox.defaults.touch = false;
          $.fancybox.defaults.hideScrollbar = false;
          $.fancybox.defaults.baseTpl = (
            '<div class="fancybox-container" role="dialog" tabindex="-1">' +
            '<div class="fancybox-bg"></div>' +
            '<div class="fancybox-stage"></div>' +
            '</div>'
          )
          $.fancybox.defaults.animationEffect = 'zoom'
          $.fancybox.defaults.animationDuration = 500
      }

      $.fancybox.open(modal);
    });
  });
}