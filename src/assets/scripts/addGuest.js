import {initSelect} from './select'

document.addEventListener('DOMContentLoaded', () => {

  const button = document.querySelector('[data-add-guest]')

  if (button) {
    const template = document.querySelector('[data-guests-template]').content.firstElementChild
    const container = document.querySelector('[data-guests-container]')

    button.addEventListener('click', () => {
      const clone = template.cloneNode(true)
      const select = $(clone.querySelector('[data-guests-select]'))
      const items = container.querySelectorAll('.booking-page__inner')

      clone.querySelector('[data-guests-title]').textContent = `Guest ${items.length + 1}`
      initSelect(select)
      container.append(clone)

      window.dispatchEvent(new CustomEvent('guestAdded', {detail: {container: clone, counter: items.length}}));
    })
  }
})
