import {initSelect} from '../select'
import 'select2';

class AdminPanel {
  constructor() {
    
    this.onClickAddButton();
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
      }
    })
  }

  addElement(button) {
    const parent = button.closest('[data-add-parent]')
    const clone = parent.querySelector('[data-add-item]').cloneNode(true)
    
    parent.querySelector('[data-add-container]').append(clone);
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
}

$(() => {
  new AdminPanel();
})