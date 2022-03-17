
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