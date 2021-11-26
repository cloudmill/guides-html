

$(() => {
  const video = $('.video')

  if (video.length) {
    const button = video.find('.video__button')
    const iframe = video.find('.video__iframe')
    let isOpen = false

    button.on('click', function() {
      video.addClass('video--active')
    })

    window.addEventListener('accordion-toggle', function() {
      isOpen = !isOpen

      if (!isOpen) {
        iframe[0].contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*')
      }
    })
  }
})