import 'Styles/_app.scss'

import mask from "inputmask";
import 'scripts/swipers.js';
import 'scripts/header.js';
import 'scripts/tooltip.js';
import 'scripts/modals.js';
import 'scripts/accordion.js';
import 'scripts/select.js';
import 'scripts/nav-links.js';
import 'scripts/parsley.js';
import 'scripts/hero.js';
import 'scripts/footer.js';
import 'scripts/data-picker.js';
import 'scripts/form-response.js';
import 'scripts/file-input.js';
import 'scripts/table.js';
import 'scripts/label-hide.js';
import 'scripts/aside.js';
import 'scripts/admin/AdminPanel.js';
import 'scripts/video.js';
import 'scripts/cart-button.js';
import 'scripts/admin-tabs.js';
import 'scripts/aos.js';
import { Tabs } from './assets/scripts/tabs'
import { Counter } from './assets/scripts/counter'
import { CalendarChanger } from './assets/scripts/calendar-changer'

const siteTemplPath = document.querySelector("[data-type=site-templ-path]");

window.CONFIG =
  window.location.hostname && window.location.hostname !== "cloudmill.github.io"
    ? {
      path: siteTemplPath ? siteTemplPath.value : "/local/templates/main",
      debug: true,
    }
    : {
      path: "./",
      debug: true,
    };

$(() => {
  require("assets/scripts/backend");

  const tabs = new Tabs('[data-tabs]')

  const counters = document.querySelectorAll('.counter')

  counters.forEach(item => {
    const counter = new Counter(item)
  })

  Inputmask({mask: "99.99.9999", showMaskOnHover: false}).mask('[data-date-input]')
  Inputmask({mask: "99:99", showMaskOnHover: false}).mask('[data-time-input]')
  Inputmask({ mask: "+9{1,}", showMaskOnHover: false, }).mask("[data-mask=phone]");

  const calendar = new CalendarChanger('.calendar-card')
})

// header active toggler
$(() => {
  let isActive = false;
  window.addEventListener("click", event => {
    const target = $(event.target).closest("[data-button]");

    if (target.length) {
      target.toggleClass('active');
      isActive = true;
    } else {
      if (isActive) {
        isActive = false;
        $('[data-button]').removeClass('active');
      }
    }
  })
})