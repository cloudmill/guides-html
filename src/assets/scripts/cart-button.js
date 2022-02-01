{
  document.addEventListener('DOMContentLoaded', function() {
    const button = document.querySelector('[data-cart-button]')

    if (button) {
      const cartCount = document.querySelectorAll('.header__store')
  
      button.onclick = function() {
  
        cartCount.forEach(item => {
          const count = item.querySelector('.header__store-num')
  
          count.textContent = +count.textContent + 1
          item.classList.add('active')
        })
      }
  
      cartCount.forEach(item => {
        item.onanimationend = (event) => {
          if (event) {
            item.classList.remove('active')
          }
        }
      })
    }
  })
}