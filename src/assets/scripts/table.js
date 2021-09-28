

$(() => {
  const parent = $('.comparison')
  const block = $('.comparison__grid')
  const text = block.find('.comparison__text')
  let arr = []

  text.each(function() {
    arr.push($(this).text())
  })
  // const template = arr.map(item => {
  //   `<div class="comparison__template">
  //   <div class="comparison__line">
  //   <div class="comparison__text">${item}</div>
  //   </div>
  //   </div>`
  // })
  const items = arr.map(item => `<div class="comparison__cell">
  <div class="comparison__item">
  <div class="comparison__text">${item}</div>
  </div>
  </div>`).join('')
  const template = `<div class="comparison__template">
  <div class="comparison__line"></div>
  ${items}
  </div>`
  console.log(template);
  parent.eq(0).append(template)
  // console.log(parent);

  // block.on('scroll', function() {
    // console.log(this.scrollLeft);
  // })
})
