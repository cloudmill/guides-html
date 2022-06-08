$(function() {
  forms();
  selectItem();
  filter();
  pageNav();
  modalAjax();
  youtubeInit();
  accordionSidebar();
  removeItem();
  filterChange();
  filterOnClient();
  calc();
  basket();
});

function getData(container) {
  const data = {};

  container.find('[data-field]').each(function() {
    try {
      data[$(this).data('field')] = window.getValue[$(this).data('func')]($(this));
    } catch (e) {
      console.log('У элемента не установлен атрибут [data-func]');
    }
  });

  return data;
}

window.objFormSuccess = {
  formSuccess: function(form) {
    form.attr('data-form-hidden', '');
    form.find('[data-type=form-response]').attr('data-response-active', '');
  },
  formDBSuccess: function() {
    backRedirect(1);
  },
  updateDBSuccess: function() {
    backRedirect(2);
  },
  bookingUserData: form => {
    window.location.href = form.data('redirect');
  },
}

window.objFormErrors = {
  adminForm: function(form, r) {
    form.siblings('[data-type=errors]').remove();
    form.after(`<div data-type="errors">${r.message}</div>`);
    form.next().css({
      'color': 'red',
      'margin-top': '20px',
    });
  }
}

window.getValue = {
  input: elem => elem.val(),
  text: elem => elem.text(),
  date: elem => flatpickr(elem, {}).input.value,
}

window.basket = {
  basketMoreData: {
    add: elem => getData(elem.parents('[data-container=calc]').find('[data-container=get-data].active')),
  },
  basketEventCallable: {
    add: elem => {
      $.fancybox.open($(`[data-fancy-modal=${elem.data('modal-id')}]`));
    },
    delete: elem => {
      $.ajax({
        type: 'GET',
        url: window.location.href,
        dataType: 'html',
        data: {},
        success: function(r) {
          const container = elem.parents('[data-container=main]');

          container.empty();
          container.append($(r));
        },
        error: ajaxCallbackErrors,
      });
    }
  }
}

function basket() {
  $(document).on('click', '[data-type=basket]', function() {
    const thisElem = $(this),
      funcMore = thisElem.data('func-more'),
      funcCallable = thisElem.data('func-callable');

    let data = {
        id: thisElem.data('id'),
        event: thisElem.data('event-type'),
      };

    if (funcMore) {
      data = Object.assign(data, window.basket.basketMoreData[funcMore](thisElem));
    }

    $.ajax({
      type: 'POST',
      url: `${window.CONFIG.path}/include/ajax/basket/event.php`,
      dataType: 'json',
      data: data,
      success: function(r) {
        if (r.success) {
          window.basket.basketEventCallable[funcCallable](thisElem);
        } else {
          alert(r.message);
        }
      },
      error: ajaxCallbackErrors,
    });
  });
}

function calc() {
  $(document).on('click', '[data-calc-backend]', function () {
    const calcContainer = $(this).parents('[data-container=calc]'),
      priceContainer = calcContainer.find('[data-container=price]'),
      loader = calcContainer.find('.loader-price'),
      loaderActiveClass = 'active';

    priceContainer.css({
      'opacity': '0.1',
    });

    loader.addClass(loaderActiveClass);

    $.ajax({
      type: 'POST',
      url: calcContainer.data('url'),
      dataType: 'json',
      data: getData(calcContainer.find('[data-container=get-data].active')),
      success: function(r) {
        if (r.success) {
          const total = priceContainer.find('[data-calc-total]');

          priceContainer.find('[data-calc-text]').addClass('hidden');
          total.text(r.price);
          total.removeClass('hidden');
          loader.removeClass(loaderActiveClass);
          priceContainer.css({
            'opacity': '1',
          });
        } else {
          alert(r.message);
        }
      },
      error: ajaxCallbackErrors,
    });
  });
}

function filterOnClient() {
  $('[data-type=client-filter]').on('click', function(e) {
    e.preventDefault();

    const id = $(this).data('id'),
      container = $(this).parents('[data-container=main]'),
      closestParent = $(this).parent(),
      activeClass = closestParent.data('active-class');

    closestParent.find(`.${activeClass}`).removeClass(activeClass);
    $(this).children().addClass(activeClass);
    container.find('[data-replace]:not([style])').css({
      'display': 'none',
    });
    container.find(`[data-replace=${id}]`).removeAttr('style');
  });
}

if ($('[data-clear-button]').length) {
  $('[data-clear-button]')[0].addEventListener('filtersReset', function() {
    const container = $(this).data('link-container');

    $.ajax({
      type: 'GET',
      url: window.location.href,
      dataType: 'html',
      data: {
        ajax: 'filter',
      },
      success: function(r) {
        if (r.success) {
          $(container).empty();
          $(container).append($(r));
        } else {
          alert(r.message);
        }
      },
      error: ajaxCallbackErrors,
    });
  });
}

function filterChange() {
  $(document).on('change', '[data-type=filter]', function() {
    const container = $(this).parents('.listing'),
      filterContainer = $(this).parents('[data-link-container]'),
      linkContainer = filterContainer.data('link-container'),
      itemsContainer = $(linkContainer),
      data = {
        ajax: 'filter',
      };

    container.addClass('active');

    filterContainer.find('input[type=checkbox]:checked, select').each(function() {
      data[$(this).data('field')] = $(this).val();
    });

    $.ajax({
      type: 'GET',
      url: window.location.href,
      dataType: 'html',
      data: data,
      success: function(r) {
        container.removeClass('active');
        itemsContainer.empty();
        itemsContainer.append($(r).find(linkContainer).children());

        const enableStyle = {
          'opacity': 1,
          'pointer-events': 'auto',
        },
        disableStyle = {
          'opacity': 0.5,
          'pointer-events': 'none',
        };
        let index = 0;
        filterContainer.children().each(function() {
          const filterBody = $(this).find('[data-type=filter-body]'),
            filterItemResponse = $(r).find('[data-link-container]').children().eq(index);

          if ($(this).find('[data-type=filter-name]').text() !== filterItemResponse.find('[data-type=filter-name]').text()) {
            filterBody.css(disableStyle);
            filterBody.find('[data-active]').css(disableStyle);
          } else {
            const arr = filterItemResponse.find('[data-type=filter]').map((arrI, item) => item.value);

            filterBody.css(enableStyle);
            filterBody.find('[data-type=filter]').each(function() {
              if (Object.values(arr).includes($(this).val())) {
                const parent = $(this).parents('[data-type=filter-item]');

                parent.css(enableStyle);
                parent.attr('data-active', true);
              } else {
                $(this).parents('[data-type=filter-item]').css(disableStyle);
              }
            });

            index++;
          }
        });
      },
      error: ajaxCallbackErrors,
    });
  });
}

window.addEventListener('dayAdded', function(e) {
  const container = $(e.detail.container),
    parent = container.parents('.admin__tab'),
    data = parent.data('input');

  container.append(`<input name="day" type="hidden" data-type="get-field" data-field="${data.highload}[${e.detail.count}][UF_DAY]" value="${e.detail.count}">`);
  container.find('[data-type=get-field]:not([name=day])').each(function() {
    const field = $(this).data('field');

    $(this).attr('data-field', `${data.highload}[${e.detail.count}][${field}][]`);
  });
});

window.addEventListener('guestAdded', function(e) {
  const container = $(e.detail.container);

  container.find('[data-type=get-field]').each(function() {
    const field = $(this).data('field');

    $(this).attr('data-field', field.replace('[]', `[${e.detail.counter}]`));
  });
});

window.addEventListener('seasonAdded', function(e) {
  const item = $(e.detail.item),
    count = e.detail.count,
    nameData = item.data('name');

  item.append(`<input type=hidden data-type="get-field" data-field="${nameData.field.replace('[]', `[${count}]`)}" value="${nameData.name}">`);
  item.append(`<input type=hidden data-type="get-field" data-field="${item.data('season').replace('[]', `[${count}]`)}" value="${e.detail.selectValue}">`);
  item.find('[data-type=get-field]').each(function() {
    const field = $(this).data('field');

    $(this).attr('data-field', field.replace('[]', `[${e.detail.count}]`));
  });
});

function removeItem() {
  $(document).on('click', '[data-type=remove-item]', function() {
    const result = confirm('Подтвердите удаление');

    if (!result) {
      return;
    }

    const thisObj = $(this);

    $.ajax({
      type: 'POST',
      url: `${window.CONFIG.path}/include/ajax/ib_el/delete.php`,
      dataType: 'json',
      data: {
        id: $(this).data('id'),
      },
      success: function(r) {
        if (r.success) {
          thisObj.parents('[data-container=item]').remove();
        } else {
          alert(r.message);
        }
      },
      error: ajaxCallbackErrors,
    });
  });
}

function ajaxCallbackErrors(xhr) {
  alert(`error: ${xhr.status}: ${xhr.statusText}`);
}

function accordionSidebar() {
  const container = $('[data-container=accordion]');

  if (!container.length) {
    return;
  }

  const selectLiElement = container.find('li.active'),
    parentLiElement = selectLiElement.parents('li'),
    ulElements = selectLiElement.find('ul').length ? selectLiElement.find('ul') : selectLiElement.closest('li:not(.active)').find('ul');

  ulElements.each(function(i) {
    if (i === 0) {
      return;
    }

    $(this).remove();
  });

  if (parentLiElement.length) {
    parentLiElement.siblings().find('ul').remove();
    parentLiElement.each(function() {
      $(this).addClass('active');
    });
  } else {
    selectLiElement.siblings().find('ul').remove();
  }
}

function youtubeInit() {
  const id = $('[data-yt-id]').val();

  if (!id) {
    return;
  }

  const container = $('[data-container=video]');

  if (!container.length) {
    return;
  }

  container.find('[data-video-id]').attr('data-video-id', id);
  container.find('img').attr('src', `//img.youtube.com/vi/${id}/maxresdefault.jpg`);
  container.find('[data-button]').append('<svg class="video__icon" width="12" height="18" viewbox="0 0 12 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L11 9L1 17V1Z" stroke="#292929" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>');
}

function backRedirect(count) {
  const arr = window.location.pathname.split('/'),
    resultArr = arr.filter(i => i);

  resultArr.splice(resultArr.length - count, count);

  window.location.href = `${window.location.protocol}//${window.location.host}/${resultArr.join('/')}`;
}

function forms() {
  $(document).on('submit', '[data-type=form-backend]', function(e) {
    e.preventDefault();

    const form = $(this),
      action = form.attr('action'),
      file = form.find('input[name=file]'),
      data = file.length ? new FormData() : {};

    form.find('[data-type=get-field], input:checked[data-field]').each(function() {
      const val = $(this).val();

      if (!val) {
        return;
      }

      const field = $(this).attr('data-field');

      file.length ? data.append(field, val) : data[field] = val;
    });

    file.each(function(i, item) {
      if (!item.files.length) {
        return;
      }

      data.append(`file[${$(this).parents('[data-file-container]').data('name')}][]`, item.files[0]);
    });

    $.ajax({
      type: 'POST',
      url: action ? action : `${window.CONFIG.path}/include/ajax/forms/index.php`,
      dataType: 'json',
      data: data,
      contentType: file.length ? false : 'application/x-www-form-urlencoded; charset=UTF-8',
      processData: !file.length,
      success: function(r) {
        if (r.success) {
          window.objFormSuccess[form.data('func')](form, r);
        } else {
          const errorFuncInit = form.data('func-error');

          errorFuncInit ? window.objFormErrors[errorFuncInit](form, r) : alert(r.message);
        }
      },
      error: ajaxCallbackErrors,
    });
  });
}

function selectItem() {
  $(document).on('click', '[data-select-item]', function() {
    $(`[data-form=${$(this).closest('[data-form-type-container]').data('form-type')}]`).find('[data-field=sectionId]').val($(this).data('value'));
  });
}

function filter() {
  $(document).on('click', '[data-filter]', function() {
    const thisObj = $(this),
      filterContainer = thisObj.parents('[data-container=filters]'),
      data = {
        'ajax': thisObj.data('ajax'),
      };

    filterContainer.find('[data-filter]').filter('.active').each(function() {
      data[$(this).data('field')] = $(this).data('value');
    });

    data[thisObj.data('field')] = thisObj.data('value');

    $.ajax({
      type: 'GET',
      url: window.location.href,
      dataType: 'html',
      data: data,
      success: function(r) {
        thisObj.closest('[data-tabs-container]').find('.active').removeClass('active');
        thisObj.addClass('active');
        thisObj.data('container-link').split(' ').forEach(function(item) {
          const container = $(`[data-container=${item}]`);

          container.empty();
          container.append($(r).find(`[data-container=${item}]`).children());
        });
      },
      error: ajaxCallbackErrors,
    });
  });
}

function pageNav() {
  $(document).on('click', '[data-type=page-nav]', function() {
    const container = $(this).closest('[data-container-main]'),
      itemsContainer = container.find('[data-container=items]'),
      pagen = container.find('[data-container=pagen]');

    if (pagen.length) {
      pagen.remove();
    }

    $.ajax({
      type: 'GET',
      url: $(this).data('url'),
      dataType: 'html',
      data: {
        'ajax': 'pagen',
      },
      success: function(r) {
        const pagen = $(r).find('[data-container=pagen]');

        itemsContainer.append($(r).find('[data-container=items]').children());

        if (pagen) {
          itemsContainer.after(pagen);
        }
      },
      error: ajaxCallbackErrors,
    });
  });
}

function modalAjax() {
  $(document).on('click', '[data-modal-backend]', function() {
    const container = $(`[data-fancy-modal=${$(this).data('fancy-container-id')}]`);

    $.ajax({
      type: 'GET',
      url: window.location.href,
      dataType: 'html',
      data: {
        'id': $(this).data('id'),
        'ajax': true,
      },
      success: function(r) {
        container.empty();
        container.append($(r));

        $.fancybox.open(container);
      },
      error: ajaxCallbackErrors,
    });
  });
}
