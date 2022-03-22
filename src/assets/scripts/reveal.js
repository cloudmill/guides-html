
// checkbox
document.addEventListener('DOMContentLoaded', () => {
  const checkbox = document.querySelectorAll('[data-checkbox-reveal]')

  if (checkbox) {
    checkbox.forEach(item => {
      const value = item.getAttribute('data-checkbox-reveal')
      item.onchange = function() {
        const revealTarget = document.querySelector(`[data-reveal-target=${value}]`)
        if (this.checked) {
          revealTarget.classList.remove('hidden')
        } else {
          revealTarget.classList.add('hidden')
        }
      }
    })
  }
})

// select
document.addEventListener('DOMContentLoaded', () => {
  const select = document.querySelectorAll('[data-select-reveal]')

  if (select) {
    select.forEach(item => {
      const value = item.getAttribute('data-select-reveal')

      item.onchange = function() {
        const revealTarget = document.querySelector(`[data-reveal-target=${value}]`)
        if (this.value === value) {
          revealTarget.classList.remove('hidden')
        } else {
          revealTarget.classList.add('hidden')
        }
      }
    })
  }
})