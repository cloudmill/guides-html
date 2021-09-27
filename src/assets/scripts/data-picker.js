import flatpickr from "flatpickr";

{
  $(() => {
    const picker = $('.data-picker')

    if (picker.length) {
      picker.each(function() {
        const ths = $(this)
        const pickerInput = ths.find('.data-picker__input')

        pickerInput.flatpickr({
          dateFormat: "d.m.Y",
          monthSelectorType: 'static',
          position: "below left",
        })
      })
    }
  })
}