
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
    const template = document.querySelector('[data-season-template]').content
    const clone = template.querySelector('[data-tab-clone]').cloneNode(true)
    const tab = clone.querySelector('.product-tabs__tab')

    tab.textContent = text
    clone.setAttribute('data-season-tab', value)

    const container = document.querySelector('[data-tabs-container]')
    const tabs = container.querySelectorAll('[data-season-tab]')
    if (!tabs.length) {
      tab.classList.add('active')
    }
    container.append(clone)
  }

  cloneSeason(value) {
    const template = document.querySelector('[data-season-template]').content
    const clone = template.querySelector('.admin__seasons-item').cloneNode(true)

    clone.setAttribute('data-season-item', value)

    const container = document.querySelector('.admin__seasons')
    const items = container.querySelectorAll('.admin__seasons-item')

    if (!items.length) {
      clone.classList.add('active')
    }

    container.append(clone)

    window.dispatchEvent(new CustomEvent('seasonAdded', {detail: {item: clone, count: items.length}}));
  }

  removeSeason(target) {
    const tab = target.closest('[data-season-tab]')
    const value = tab.getAttribute('data-season-tab')
    const season = document.querySelector(`[data-season-item="${value}"]`)

    season.remove()
    tab.remove()
    for (let i = 0; i < this.select.options.length; i++) {
      if (this.select.options[i].value === value) {
        this.select.options[i].removeAttribute('disabled')
      }
    }
  }

  changeSeason(target) {
    if (!target.classList.contains('active')) {
      const value = target.closest('[data-season-tab]').getAttribute('data-season-tab')
      const season = document.querySelector(`[data-season-item="${value}"]`)
      const oldSeason = document.querySelector('.active[data-season-item]')
      const oldTab = document.querySelector('.active[data-change-season]')

      if (oldSeason) {
        oldSeason.classList.remove('active')
        oldTab.classList.remove('active')
      }

      target.classList.add('active')
      season.classList.add('active')
    }
  }
}
