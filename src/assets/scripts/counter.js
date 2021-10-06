

export class Counter {
  constructor(selector) {
    this.root = selector
    this.plus = this.root.querySelector('[data-count-plus]')
    this.minus = this.root.querySelector('[data-count-minus]')
    this.number = this.root.querySelector('.counter__number')
    this.maxCount = this.root.getAttribute('data-max-count')

    if (this.root) {
      this.init()
      this.setDisabled()
    }
  }

  init() {
    window.addEventListener('click', e => {
      const target = e.target.closest('.counter__item')

      switch (target) {
        case this.minus:
          this.decrement()
          break;
        case this.plus: 
          this.increment()
          break;
      }
      this.setDisabled()
    })
  }

  increment() {
    if (+this.maxCount > +this.number.textContent) {
      this.number.textContent = +this.number.textContent + 1
    } 
  }

  decrement() {
    if (+this.number.textContent) {
      this.number.textContent = +this.number.textContent - 1
    } 
  }

  setDisabled() {
    if (+this.maxCount === +this.number.textContent) {
      this.plus.classList.add('disabled')
    } else {
      this.plus.classList.remove('disabled')
    }

    if (!+this.number.textContent) {
      this.minus.classList.add('disabled')
    } else {
      this.minus.classList.remove('disabled')
    }
  }
}

