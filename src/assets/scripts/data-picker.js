import flatpickr from "flatpickr";

{
  $(() => {
    const picker = $('.data-picker')

    if (picker.length) {
      picker.each(function() {
        const ths = $(this)
        const pickerWrapper = ths.closest('.data-picker-wrapper')
        const pickerInput = ths.find('.data-picker__input')

        pickerInput.flatpickr({
          dateFormat: "d.m.Y",
          monthSelectorType: 'static',
          appendTo: pickerWrapper[0],
          position: "below center"
        })
      })
    }
  })
}