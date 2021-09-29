import { mediaQuery } from './mediaQueries.js'

$(() => {
  const table = $('.comparison')

  if (table.length && !mediaQuery.matches) {
    const grid = $('.comparison__grid')

    const tableRowHeight = table.find('.comparison__row').innerHeight()
    const lineHeight = grid.find('.comparison__line').innerHeight()

    const gridText = grid.find('.comparison__text')
    let arr = []

    gridText.each(function() {
      arr.push($(this).text())
    })
    const textItems = arr.map(item => `<div class="comparison__item">
    <div class="comparison__cell">
    <div class="comparison__text">${item}</div>
    </div>
    </div>`).join('')
    const template = `<div class="comparison__template">
    <div class="comparison__line"></div>
    ${textItems}
    </div>`

    table.append(template)

    const tableTemplate = table.find('.comparison__template')
    const tableLine =  tableTemplate.find('.comparison__line')

    tableTemplate.css('padding-top', `${tableRowHeight}px`)
    tableLine.css('height', `${lineHeight}px`)

    grid.on('scroll', function() {
      if (this.scrollLeft > 0) {
        tableTemplate.addClass('comparison__template--visible')
      } else {
        tableTemplate.removeClass('comparison__template--visible')
      }
    })
  }
})
