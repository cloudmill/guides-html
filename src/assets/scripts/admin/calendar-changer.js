import '@fancyapps/fancybox';
import { CustomExeption } from '../CustomExeption';

export class CalendarChanger {
  constructor(selector) {
    
    $.fancybox.defaults.closeExisting = true;
    $.fancybox.defaults.touch = false;
    
    this.root = document.querySelector(selector)
    
    if (this.root) {

      this.modal = document.querySelector('[data-admin-modal]')
      this.inputStart = this.modal.querySelector('[data-modal-start]') 
      this.inputEnd = this.modal.querySelector('[data-modal-end]') 
      this.inputClose = this.modal.querySelector('[data-close-input]') 
      this.exeptionHander = new CustomExeption('[data-error-container]', '.admin__error')
      
      this.main();
    }
  }

  main() {
    this.modalHandler()
    this.selectHandler()
    this.formHandler()
  }

  modalHandler() {
    window.addEventListener('click', (event) => {
      const modalButton = event.target.closest('[data-admin-button]')

      if (modalButton) {
        $.fancybox.open(this.modal);
        this.clearModal()
        this.buttonId = modalButton.getAttribute('data-admin-button')
        this.button = modalButton.closest('[data-admin-button]')

        if (this.buttonId === 'single') {
          this.getItems(this.button)
          this.setModal()
        }
      }
    })
  }

  selectHandler() {
    this.select = document.querySelector('[data-admin-select]')
    const container = this.select.closest('[data-admin-modal]')

    this.select.onchange = () => {
      if (this.select.value === 'active') {
        container.classList.add('active')
        this.inputClose.setAttribute('required', 'required')
      } else {
        container.classList.remove('active')
        this.inputClose.removeAttribute('required')
      }
    }
  }

  formHandler() {
    const form = this.modal.querySelector('.form')

    form.onsubmit = (e) => {
      e.preventDefault()

      if (this.buttonId == 'single') {
        this.changeItems()
      }

      if (this.buttonId == 'group') {
        this.changeGroup()
      }

      $.fancybox.close(this.modal)
    }
  }

  getItems(selector) {
    this.day = selector.querySelector('[data-calendar-day]')
    this.status = selector.querySelector('[data-calendar-status]')
    this.startTime = selector.querySelector('[data-calendar-start]')
    this.endTime = selector.querySelector('[data-calendar-end]')
  }

  setModal() {
    const value = this.button.getAttribute('data-status')
    $(this.select).val(value).trigger('change')

    if (value === 'active') {
      const dayCount = this.day.textContent.replace(/\D/gi, '')
      this.inputClose.value = dayCount
    }
  }

  changeItems() {
    this.day.textContent = this.inputClose.value ? this.inputClose.value + ' дня' : this.day.textContent
    if (this.select.value) {
      this.status.textContent = this.select.options[this.select.selectedIndex].text
      const parent = this.status.closest('[data-status]')
      parent.setAttribute('data-status', this.select.value)
    }
    
    if (this.startTime) {
      this.startTime.textContent = this.inputStart.value || this.startTime.textContent
      this.endTime.textContent = this.inputEnd.value || this.endTime.textContent
    }
  }

  changeGroup() {
    this.calendarDays = document.querySelectorAll('[data-admin-checkbox-item]') 
    let arr = []

    this.calendarDays.forEach((item, index) => {
      const checkbox = item.querySelector('.checkbox__input')
      checkbox.checked ? arr.push(index + 1) : ''
    })
    
    if (!arr.length) {
      this.exeptionHander.throw('days', 'Выберите дни')
      this.isExeptionExist = true;
      return;
    }

    this.changeStart = document.querySelector('[data-change-start]').value
    this.changeEnd = document.querySelector('[data-change-end]').value

    if (!this.changeStart && !this.changeEnd) {
      this.exeptionHander.throw('date', 'Заполните поля')
      this.isExeptionExist = true;
      return;
    }

    const selector = arr.map(item => `[data-admin-button="single"]:nth-child(${item})`).join(', ')
    const items = document.querySelectorAll(selector)
    const startDate = new Date(this.changeStart.split('.').reverse().join('.'))
    const endDate = new Date(this.changeEnd.split('.').reverse().join('.'))
    
    items.forEach(item => {
      this.getItems(item)
      const curDate = new Date(item.getAttribute('data-calendar-data'))

      if (curDate > startDate && curDate < endDate) {
        this.changeItems()
      }
    })

    if (this.isExeptionExist) {
      this.exeptionHander.clear()
    }
  }

  clearModal() {
    this.inputClose.value = ''
    $(this.select).val(null).trigger('change')
    if (this.inputStart) {
      this.inputStart.value = ''
      this.inputEnd.value = ''
    }
  }
}
