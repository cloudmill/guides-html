import '@fancyapps/fancybox';

// $(() => {

//   $.fancybox.defaults.closeExisting = true;
//   $.fancybox.defaults.touch = false;
//   $.fancybox.defaults.baseTpl = (
//     '<div class="fancybox-container" role="dialog" tabindex="-1">' +
//     '<div class="fancybox-bg"></div>' +
//     '<div class="fancybox-stage"></div>' +
//     '</div>'
//   )
  
//   const modal = document.querySelector('[data-admin-modal]');
//   const inputPayment = modal.querySelector('[data-payment-input]') 
//   const inputStart = modal.querySelector('[data-modal-start]') 
//   const inputEnd = modal.querySelector('[data-modal-end]') 
//   const calendarItems = document.querySelectorAll('[data-admin-checkbox-item]') //?

//   const state = {
//     button: null,
//     buttonType: null,
//   }

//   window.addEventListener('click', (event) => {
//     const modalButton = event.target.closest('[data-admin-button]')
//     const changeButton = event.target.closest('[data-admin-change-button]')

//     if (modalButton) {
//       $.fancybox.open(modal);
//       const buttonId = modalButton.getAttribute('data-admin-button')
//       state.buttonType = buttonId
//       state.button = modalButton.closest('[data-admin-button]')
//     }

//     if (changeButton) {
//       const select = document.querySelector('[data-admin-select]')
//       const selectText = select.querySelector('.select2-selection__rendered')
//       const dataStart = document.querySelector('[data-calendar-start]') // ?
//       const dataEnd = document.querySelector('[data-calendar-end]') // ?

//       switch (state.buttonType) {
//         case 'single': {
//           const day = state.button.querySelector('[data-calendar-day]')
//           const status = state.button.querySelector('[data-calendar-status]')
//           const start = state.button.querySelector('[data-calendar-start]')
//           const end = state.button.querySelector('[data-calendar-end]')

//           status.textContent = selectText.textContent
//           day.textContent = inputPayment.value + ' дня'
//           start.textContent = inputStart.value
//           end.textContent = inputEnd.value
//           break;
//         }

//         case 'group': {
//           let arr = []

//           calendarItems.forEach((item, index) => {
//             const checkbox = item.querySelector('.checkbox__input')
//             checkbox.checked ? arr.push(index + 1) : ''
//           })

//           const selector = arr.map(item => `[data-admin-button="single"]:nth-child(${item})`).join(', ')
//           const items = document.querySelectorAll(selector)

//           items.forEach(item => {
//             const status = item.querySelector('[data-calendar-status]')
//             const day = item.querySelector('[data-calendar-day]')
//             const start = item.querySelector('[data-calendar-start]')
//             const end = item.querySelector('[data-calendar-end]')
            
//             if (dataStart.value) {
//               const curDate = new Date(item.getAttribute('data-calendar-data'))

//               if (curDate > new Date(dataStart.value) && curDate < new Date(dataEnd.value)) {
//                 status.textContent = selectText.textContent
//                 day.textContent = inputPayment.value + ' дня'
//               }
//             }

//             status.textContent = selectText.textContent
//             day.textContent = inputPayment.value + ' дня'
//             start.textContent = inputStart.value
//             end.textContent = inputEnd.value
//           })
//           break;
//         }
//       }

//       inputPayment.value = ''
//       $.fancybox.close(modal);
//     }
//   })
// })

class CalendarChanger {
  constructor() {
    $.fancybox.defaults.closeExisting = true;
    $.fancybox.defaults.touch = false;
    $.fancybox.defaults.baseTpl = (
      '<div class="fancybox-container" role="dialog" tabindex="-1">' +
      '<div class="fancybox-bg"></div>' +
      '<div class="fancybox-stage"></div>' +
      '</div>'
    )
    this.modal = document.querySelector('[data-admin-modal]')
    this.inputPayment = this.modal.querySelector('[data-payment-input]') 
    this.inputStart = this.modal.querySelector('[data-modal-start]') 
    this.inputEnd = this.modal.querySelector('[data-modal-end]') 
    this.calendarItems = document.querySelectorAll('[data-admin-checkbox-item]') //?

    this.handleModal()
  }

  handleModal() {
    window.addEventListener('click', (event) => {
      const modalButton = event.target.closest('[data-admin-button]')
      const changeButton = event.target.closest('[data-admin-change-button]')

      if (modalButton) {
        $.fancybox.open(this.modal);
        this.buttonId = modalButton.getAttribute('data-admin-button')
        this.button = modalButton.closest('[data-admin-button]')
      }

      if (changeButton) {
        this.select = document.querySelector('[data-admin-select]')
        this.selectText = this.select.querySelector('.select2-selection__rendered')
        this.dataStart = document.querySelector('[data-calendar-start]') // ?
        this.dataEnd = document.querySelector('[data-calendar-end]') // ?

        switch (this.buttonId) {
          case 'single': {
            this.getItems(this.button)
            this.setItems()
            break;
          }
          case 'group': {
            let arr = []

            this.calendarItems.forEach((item, index) => {
              const checkbox = item.querySelector('.checkbox__input')
              checkbox.checked ? arr.push(index + 1) : ''
            })

            const selector = arr.map(item => `[data-admin-button="single"]:nth-child(${item})`).join(', ')
            const items = document.querySelectorAll(selector)

            items.forEach(item => {
              this.getItems(item)
              
              if (this.dataStart.value) {
                const curDate = new Date(item.getAttribute('data-calendar-data'))

                if (curDate > new Date(this.dataStart.value) && curDate < new Date(this.dataEnd.value)) {
                  this.setItems()
                }
              }

              this.setItems()
            })
            break;
          }
        }

        this.inputPayment.value = ''
        $.fancybox.close(this.modal);
      }
    })
  }

  getItems(selector) {
    this.day = selector.querySelector('[data-calendar-day]')
    this.status = selector.querySelector('[data-calendar-status]')
    this.start = selector.querySelector('[data-calendar-start]')
    this.end = selector.querySelector('[data-calendar-end]')
  }

  setItems() {
    this.day.textContent = this.inputPayment.value + ' дня'
    this.status.textContent = this.selectText.textContent
    if (this.start) {
      this.start.textContent = this.inputStart.value
      this.end.textContent = this.inputEnd.value
    }
  }
}

$(() => {
  const calendar = new CalendarChanger()

})