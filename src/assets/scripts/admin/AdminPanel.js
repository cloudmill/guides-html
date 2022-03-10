class AdminPanel {
  constructor() {
    
    this.onClickAddButton();
  }

  onClickAddButton() {
    window.addEventListener('click', event => {
      const target = event.target

      if (target.hasAttribute('data-add-button')) {
        this.addElement(target)
      }
    })
  }

  addElement(button) {
    const parent = button.closest('[data-add-parent]')
    const container = parent.querySelector('[data-add-container]')
    const clone = parent.querySelector('[data-add-item]').cloneNode(true)
    
    container.append(clone);
  }
}

$(() => {
  new AdminPanel();
})