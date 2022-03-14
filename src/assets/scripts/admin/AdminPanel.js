import {initSelect} from '../select'
import 'select2';
import { SeasonManager } from './SeasonManager';

class AdminPanel {
  constructor() {
    const adminPage = document.querySelector('.admin')
    
    if (adminPage) {
      this.onClickAddButton();
      this.seasonManager = new SeasonManager();
    }
  }

  onClickAddButton() {
    window.addEventListener('click', event => {
      const target = event.target

      if (target.hasAttribute('data-add-button')) {
        const attrValue = target.getAttribute('data-add-button')

        if (attrValue === "default") {
          this.addElement(target)
        }

        if (attrValue === "select") {
          this.addSelect(target)
        }

        if (attrValue === "seasonValue") {
          this.addSeasonValue(target)
        }

        if (attrValue === "year") {
          this.addYear(target)
        }

        if (attrValue === "template") {
          this.addTemplate(target)
        }
      }
    })
  }

  addElement(button) {
    const parent = button.closest('[data-add-parent]')
    this.clone = parent.querySelector('[data-add-item]').cloneNode(true)
    
    parent.querySelector('[data-add-container]').append(this.clone);
  }

  addSelect(button) {
    const parent = button.closest('[data-add-parent]')
    const item = parent.querySelector('[data-add-item]')
    const select = $(item.querySelector('.select__select'))

    select.select2('destroy')
    const clone = item.cloneNode(true)
    initSelect(select)

    parent.querySelector('[data-add-container]').append(clone);
    initSelect($(clone.querySelector('.select__select')))
  }

  addSeasonValue(button) {
    this.addElement(button)

    const text = this.clone.querySelector('.admin__text')
    text.textContent = "Произвольное значение"
  }

  addYear(button) {
    const parent = button.closest('[data-add-parent]')
    const container = parent.querySelector('[data-add-container]')
    const clone = container.lastElementChild.cloneNode(true)
    
    container.append(clone);

    const year = clone.querySelector('.admin__text')
    const attrYear = clone.querySelector('[data-real-tabs]')
    let attrValue = attrYear.getAttribute('data-real-tabs')
    
    attrYear.classList.remove('active')
    attrYear.setAttribute('data-real-tabs', ++attrValue)
    year.textContent++
    this.cloneCalendar(attrValue)
  }

  cloneCalendar(year) {
    const template = document.querySelector('[data-calendar-template]')
    const clone = template.content.firstElementChild.cloneNode(true)
    const cards = clone.querySelectorAll('[data-calendar-data]')

    for (let i = 0; i < cards.length; i++) {
      let value = cards[i].getAttribute('data-calendar-data')
      value = value.replace(/\d{4}/, year)

      cards[i].setAttribute('data-calendar-data', value)
    }
    clone.setAttribute('data-tab-block', year)

    document.querySelector('[data-calendar-parent]').append(clone)
  }
  
  addTemplate(button) {
    const parent = button.closest('[data-add-parent]')
    const clone = parent.querySelector('[data-add-template]').content.firstElementChild.cloneNode(true)
    
    parent.querySelector('[data-add-container]').append(clone);
  }
}

$(() => {
  new AdminPanel();
})