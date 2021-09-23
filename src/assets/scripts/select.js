import 'select2';

// select
{
  $(() => {
    // const select = $('.select__select');
    $('.select__select').each(function () {
      const select = $(this);
      // const selectWrapper = select.closest('.select-wrapper');
      const selectWrapper = $('.select-wrapper');
      const selectWrapperStyles = getComputedStyle(selectWrapper[0]);
      if (selectWrapperStyles.position === 'static') {
        selectWrapper.css('position', 'relative');
      }

      
      function formatState (state) {
        if (!state.id) {
          return state.text;
        }

        var $state = $(
          '<span>HELLO SELECT <span></span></span>'
        );

        // Use .text() instead of HTML string concatenation to avoid script injection issues
        $state.find("span").text(state.text);
        // $state.find("img").attr("src", baseUrl + "/" + state.element.value.toLowerCase() + ".png");

        return $state;
      };
      

      select.select2({
        dropdownParent: selectWrapper,
        selectOnClose: true,
        minimumResultsForSearch: Infinity,
        escapeMarkup: function(markup) {
          return markup
        }
      });

      // select.on('select2:open', () => {
      //   selectWrapper.css('z-index', '100000');

      //   const selectDropdown = selectWrapper.find('.select2-dropdown');

      //   selectDropdown.hide();
      //   const timeout = setTimeout(() => {
      //     selectDropdown.slideDown({ duration: 500, });

      //     clearTimeout(timeout);
      //   }, 0);
      // });

      // select.on('select2:closing', event => {
      //   event.preventDefault();

      //   const selectDropdown = selectWrapper.find('.select2-dropdown');

      //   const timeout = setTimeout(() => {
      //     selectWrapper.css('z-index', '');

      //     const select2 = selectWrapper.find('.select2');

      //     select2.addClass('closing');
      //     select2.removeClass('select2-container--open');
      //     selectDropdown.slideUp(500, () => {
      //       const timeout2 = setTimeout(() => {
      //         select.select2('destroy');
      //         select.select2({
      //           dropdownParent: selectWrapper,
      //           selectOnClose: true,
      //         });
      //         select.removeClass('closing');

      //         selectWrapper.css('z-index', '');

      //         clearTimeout(timeout2);
      //       }, 300);
      //     });
      //     clearTimeout(timeout);
      //   }, 0);
      // });

    });
  });
}