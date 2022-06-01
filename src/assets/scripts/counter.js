
export class Counter {
  constructor(selector) {
    this.root = selector
    this.plus = this.root.querySelector('[data-count-plus]')
    this.minus = this.root.querySelector('[data-count-minus]')
    this.number = this.root.querySelector('.counter__number')
    this.globalNumber = document.querySelector(`[data-count-number="${this.root.getAttribute('data-counter')}"]`)
    this.maxCount = this.root.getAttribute('data-max-count') || Infinity

    if (this.root) {
      this.init()
      this.setDisabled()
    }
  }

  init() {
    this.root.addEventListener('click', e => {
      const target = e.target.closest('.counter__item')

      if (target === this.minus) {
        if (!target.classList.contains('disabled')) {
          this.number.textContent = +this.number.textContent - 1
          this.changeGlobalNumber(-1)
        }
      }

      if (target === this.plus) {
        if (!target.classList.contains('disabled')) {
          this.number.textContent = +this.number.textContent + 1
          this.changeGlobalNumber(1)
        }
      }

      this.setDisabled()
    })
  }

  changeGlobalNumber(num) {
    if (this.globalNumber) {
      this.globalNumber.textContent = +this.globalNumber.textContent + num

      if (+this.globalNumber.textContent > +this.maxCount) {
        this.globalNumber.textContent = +this.globalNumber.textContent - 1
        this.number.textContent = +this.number.textContent - 1
        $.fancybox.open($(`[data-fancy-modal="11"]`))
      } 
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

$(() => {
  const counters = document.querySelectorAll('.counter')

  counters.forEach(item => {
    const counter = new Counter(item)
  })
})

