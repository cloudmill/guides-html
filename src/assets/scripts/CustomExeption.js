export class CustomExeption {
  constructor(container, element) {

    this.container = document.querySelector(container)
    this.element = this.container.querySelector(element)
  }

  throw(type, text) {
    this.container.setAttribute('data-type-error', type)
    this.element.textContent = text
  }

  clear() {
    this.container.removeAttribute('data-type-error')
  }
}