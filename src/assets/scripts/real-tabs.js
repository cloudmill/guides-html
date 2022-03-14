

$(() => {
  window.addEventListener('click', event => {
    const target = event.target.closest('[data-real-tabs]')

    if (target && !target.classList.contains('active')) {
      const value = target.getAttribute('data-real-tabs')
      const block = document.querySelector(`[data-tab-block='${value}']`)
      
      document.querySelector('.active[data-tab-block]').classList.remove('active')
      document.querySelector('.active[data-real-tabs]').classList.remove('active')
      
      target.classList.add('active')
      block.classList.add('active')
    }
  })
})