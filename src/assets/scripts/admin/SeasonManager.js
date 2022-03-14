
export class SeasonManager {
  constructor() {

    this.select = document.querySelector("[data-season-select]")
    
    if (this.select) {
      this.clickHandler()
    }
  }

  clickHandler() {
    window.addEventListener('click', event => {
      const target = event.target

      if (target.hasAttribute('data-add-season')) {
        this.addSeason()
      }

      if (target.closest('[data-remove-season]')) {
        this.removeSeason(target)
      }

      if (target.hasAttribute('data-change-season')) {
        this.changeSeason(target)
      }
    })
  }

  addSeason() {
    const value = this.select.value
    const currentOption = this.select.options[this.select.selectedIndex]
    if (value) {
      currentOption.setAttribute('disabled', 'disabled')
      
      $(this.select).val(null).trigger('change')
  
      this.cloneTab(currentOption.text, value)
      this.cloneSeason(value)
    }
  }

  cloneTab(text, value) {
    const tabItem = document.querySelector('[data-season-tab]')
    const clone = tabItem.cloneNode(true)
    const tab = clone.querySelector('.product-tabs__tab')

    tab.textContent = text
    tab.classList.remove('active')
    clone.setAttribute('data-season-tab', value)
    tabItem.parentElement.append(clone)
  }

  cloneSeason(value) {
    const container = document.querySelector('.admin__seasons')
    const clone = container.querySelector('.admin__seasons-item').cloneNode(true)

    clone.classList.remove('active')
    clone.setAttribute('data-season-item', value)

    container.append(clone)
  }

  removeSeason(target) {
    const removeButtons = document.querySelectorAll('[data-remove-season]')
    if (removeButtons.length > 1) {
      const tab = target.closest('[data-season-tab]')
      const value = tab.getAttribute('data-season-tab')
      const season = document.querySelector(`[data-season-item=${value}]`)
  
      season.remove()
      tab.remove()
      for (let i = 0; i < this.select.options.length; i++) {
        if (this.select.options[i].value === value) {
          this.select.options[i].removeAttribute('disabled')
        }
      }
    }
  }

  changeSeason(target) {
    if (!target.classList.contains('active')) {
      const value = target.closest('[data-season-tab]').getAttribute('data-season-tab')
      const season = document.querySelector(`[data-season-item=${value}]`)

      document.querySelector('.active[data-season-item]').classList.remove('active')
      document.querySelector('.active[data-change-season]').classList.remove('active')
      
      target.classList.add('active')
      season.classList.add('active')
    }
  }
}