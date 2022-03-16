$(() => {
  const list = $('[data-limited-list]')

  if (list.length) {
    const count = list.data('limited-list')
    const items = list.find('[data-list-item]')

    if (items.length > count) {
      const container = document.createElement('div')

      $(container).addClass('js-hidden')
      $(container).attr('data-accordion-dropdown', '')
      list.append(container)

      for (let i = count; i < items.length; i++) {
        container.append(items.eq(i)[0])
      }
    }
  }
})