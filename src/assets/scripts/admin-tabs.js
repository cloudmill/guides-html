
$(() => {
  if ($('.admin').length) {
    const tabs = $('[data-admin-tabs]')
    const tab = tabs.find('[data-admin-item]')
    const tabsContainer = $('.admin__tab')
  
    tab.on('click', function() {
      const index = $(this).closest('.product-tabs__item').index()
      
      if (!$(this).hasClass('active')) {
        tab.removeClass('active')
        $(this).addClass('active')
        tabsContainer.removeClass('active')
        tabsContainer.eq(index).addClass('active')
      }
    })
  }
})
