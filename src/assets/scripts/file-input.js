export function changeFile(item, ths) {
  const inputs = item.closest('[data-file-container]').querySelectorAll('.file__input')
  
  item.querySelector('.file__name').textContent = ths.files[0].name
  item.classList.add('file--downloaded')

  inputs.forEach(input => {
    input.removeAttribute('required')
  })
}


$(() => {
  const file = document.querySelectorAll('[data-file-input]') 
  
  if (file.length) {
    file.forEach(item => {
      const inputFile = item.querySelector('.file__input');

      inputFile.onchange = function() {
        changeFile(item, this)
      }
    })

    window.addEventListener('click', (event) => {
      const target = event.target.closest('.file__button')

      if (target) {
        const container = target.closest('[data-file-input]')
        const inputs = target.closest('[data-file-container]').querySelectorAll('.file__input')
        let isRequired = true

        container.classList.remove('file--downloaded')
        container.querySelector('.file__input').value = ""

        inputs.forEach(item => {
          if (item.value) {
            isRequired = false
          }
        })

        if (isRequired) {
          inputs.forEach(item => {
            item.setAttribute('required', 'required')
          })
        }
      }
    })
  }
});