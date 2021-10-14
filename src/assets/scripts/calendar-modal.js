import '@fancyapps/fancybox';

class CalendarChanger {
  constructor(selector) {
    
    $.fancybox.defaults.closeExisting = true;
    $.fancybox.defaults.touch = false;
    
    this.root = document.querySelector(selector)
    
    if (this.root) {
      this.modal = document.querySelector('[data-admin-modal]')
      this.inputPayment = this.modal.querySelector('[data-payment-input]') 
      this.calendarItems = document.querySelectorAll('[data-admin-checkbox-item]') 
      this.inputStart = this.modal.querySelector('[data-modal-start]') 
      this.inputEnd = this.modal.querySelector('[data-modal-end]') 

      this.handleModal()
    }
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
        this.changeStart = document.querySelector('[data-change-start]') // ?
        this.changeEnd = document.querySelector('[data-change-end]') // ?

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
            
            if (arr.length) {
              const selector = arr.map(item => `[data-admin-button="single"]:nth-child(${item})`).join(', ')
              const items = document.querySelectorAll(selector)

              items.forEach(item => {
                this.getItems(item)

                if (this.changeStart.value) {
                  const curDate = new Date(item.getAttribute('data-calendar-data'))

                  if (curDate > new Date(this.changeStart.value) && curDate < new Date(this.changeEnd.value)) {
                    this.setItems()
                  }
                } else {
                  this.setItems()
                }
              })
            }
            break;
          }
        }
        this.closeModal()
      }
    })
  }

  getItems(selector) {
    this.day = selector.querySelector('[data-calendar-day]')
    this.status = selector.querySelector('[data-calendar-status]')
    this.startTime = selector.querySelector('[data-calendar-start]')
    this.endTime = selector.querySelector('[data-calendar-end]')
  }

  setItems() {
    this.day.textContent = this.inputPayment.value + ' дня'
    this.status.textContent = this.selectText.textContent
    if (this.startTime) {
      this.startTime.textContent = this.inputStart.value
      this.endTime.textContent = this.inputEnd.value
    }
  }

  closeModal() {
    this.inputPayment.value = ''
    $.fancybox.close(this.modal);
    if (this.inputStart) {
      this.inputStart.value = ''
      this.inputEnd.value = ''
    }
  }
}

$(() => {
  const calendar = new CalendarChanger('.calendar-card')
})