

export class Tabs {
  constructor(selector) {
    this.roots = document.querySelectorAll(selector)
    
    if (this.roots) {
      this.rootsTabs = []
      this.roots.forEach(item => {
        this.rootsTabs.push(item.querySelectorAll('[data-tabs-item]'))
      })
      console.log(this.rootsTabs);
      this.init()
    }
  }

  init() {
    this.roots.forEach((item, index) => {
      item.addEventListener('click', (e) => {
        const target = e.target.closest('[data-tabs-item]')
        if (target) {
          console.log(1);
          this.setActive(target, index)
        }
      })
    }) 
  }

  setActive(newItem, index) {
    this.rootsTabs[index].forEach(item => {
      if (item !== newItem) {
        item.classList.remove('active')
      } else {
        item.classList.add('active');
      }
    })
  }
}

const tabs = new Tabs('[data-tabs]')

