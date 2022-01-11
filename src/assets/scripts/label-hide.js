
$(() => {
  const label = document.querySelector('[data-label]')

  if (label) {

    window.addEventListener('click', event => {
      const target = event.target
  
      if (target.closest('[data-show-button]')) {
        label.classList.remove('hidden')
      }
  
      if (target.closest('[data-hide-button]')) {
        label.classList.add('hidden')
      }
    })
  }
})