
export class Counter {
  constructor(selector) {
    this.root = selector
    this.plus = this.root.querySelector('[data-count-plus]')
    this.minus = this.root.querySelector('[data-count-minus]')
    this.number = this.root.querySelector('.counter__number')
    this.maxCount = this.root.getAttribute('data-max-count') || Infinity

    if (this.root) {
      this.init()
      this.setDisabled()
    }
  }

  init() {
    window.addEventListener('click', e => {
      const target = e.target.closest('.counter__item')

      if (target === this.minus) {
        if (!target.classList.contains('disabled')) {
          this.number.textContent = +this.number.textContent - 1
        }
      }

      if (target === this.plus) {
        if (!target.classList.contains('disabled')) {
          this.number.textContent = +this.number.textContent + 1
        }
      }
      
      this.setDisabled()
    })
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

