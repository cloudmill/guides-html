import '@fancyapps/fancybox';

class CalendarChanger {
  constructor(selector) {
    
    $.fancybox.defaults.closeExisting = true;
    $.fancybox.defaults.touch = false;
    
    this.root = document.querySelector(selector)
    
    if (this.root) {
      this.changeStart = document.querySelector('[data-change-start]') 
      this.changeEnd = document.querySelector('[data-change-end]') 
      this.calendarItems = document.querySelectorAll('[data-admin-checkbox-item]') 

      this.modal = document.querySelector('[data-admin-modal]')
      this.modalForm = this.modal.querySelector('.form')
      this.inputStart = this.modal.querySelector('[data-modal-start]') 
      this.inputEnd = this.modal.querySelector('[data-modal-end]') 
      this.inputPayment = this.modal.querySelector('[data-payment-input]') 

      this.handleModal()
      this.submitChanges()
    }
  }

  handleModal() {
    window.addEventListener('click', (event) => {
      const modalButton = event.target.closest('[data-admin-button]')

      if (modalButton) {
        $.fancybox.open(this.modal);
        this.buttonId = modalButton.getAttribute('data-admin-button')
        this.button = modalButton.closest('[data-admin-button]')
      }
    })
  }

  submitChanges() {
    this.modalForm.onsubmit = (e) => {
      e.preventDefault()

      this.select = document.querySelector('[data-admin-select]')
      this.selectText = this.select.querySelector('.select2-selection__rendered').textContent
      this.selectValue = this.select.querySelector('.select__select').getAttribute('data-select-value')

      switch (this.buttonId) {
        case 'single': {
          this.getItems(this.button)
          this.setItems()
          break;
        }
        case 'group': {
          this.changeGroup()
          break;
        }
      }
      this.closeModal()
    }
  }

  changeGroup() {
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
          const startDate = new Date(this.changeStart.value.split('.').reverse().join('.'))
          const endDate = new Date(this.changeEnd.value.split('.').reverse().join('.'))

          if (curDate > startDate && curDate < endDate) {
            this.setItems()
          }
        } else {
          this.setItems()
        }
      })
    }
  }

  getItems(selector) {
    this.day = selector.querySelector('[data-calendar-day]')
    this.status = selector.querySelector('[data-calendar-status]')
    this.startTime = selector.querySelector('[data-calendar-start]')
    this.endTime = selector.querySelector('[data-calendar-end]')
  }

  setItems() {
    this.day.textContent = this.inputPayment.value ? this.inputPayment.value + ' дня' : this.day.textContent
    this.status.textContent = this.selectValue ? this.selectText : this.status.textContent
    if (this.startTime) {
      this.startTime.textContent = this.inputStart.value || this.startTime.textContent
      this.endTime.textContent = this.inputEnd.value || this.endTime.textContent
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