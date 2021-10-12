// import {Tabs} from './tabs'

// export class AdminTabs {
//   constructor(name) {
//     this.root = document.querySelectorAll(name)
//     this.tabs = document.querySelectorAll('.admin__tab')

//   }

//   setActive(item) {

//   }
// }

$(() => {
  const tabs = $('[data-tabs]')
  const tab = tabs.find('[data-tabs-item]')
  const tabsContainer = $('.admin__tab')

  tab.on('click', function() {
    const index = $(this).closest('[data-admin-tab]').index()
    
    if (!$(this).hasClass('active')) {
      tab.removeClass('active')
      $(this).addClass('active')
      tabsContainer.removeClass('active')
      tabsContainer.eq(index).addClass('active')
    }
  })
})
