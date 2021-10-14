import 'Styles/_app.scss'

import mask from "inputmask";
import 'scripts/swipers.js';
import 'scripts/header.js';
import 'scripts/tooltip.js';
import 'scripts/modals.js';
import 'scripts/accordion.js';
import 'scripts/select.js';
import 'scripts/nav-links.js';
// import 'scripts/sticky.js';
import 'scripts/parsley.js';
import 'scripts/hero.js';
import 'scripts/footer.js';
import 'scripts/data-picker.js';
import 'scripts/form-response.js';
import 'scripts/file-input.js';
import 'scripts/table.js';
import 'scripts/aside.js';
import 'scripts/admin-tabs.js';
import 'scripts/aos.js';
import 'scripts/calendar-modal.js';
import { Tabs } from './assets/scripts/tabs'
import { Counter } from './assets/scripts/counter'


$(() => {
  const tabs = new Tabs('[data-tabs]')

  const counters = document.querySelectorAll('.counter')

  counters.forEach(item => {
    const counter = new Counter(item)
  })

  Inputmask({mask: "99.99.9999", showMaskOnHover: false}).mask('[data-date-input]')
  Inputmask({mask: "99:99", showMaskOnHover: false}).mask('[data-time-input]')
})
