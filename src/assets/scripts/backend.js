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
});

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

function filterChange() {
  $(document).on('change', '[data-type=filter]', function() {
    const container = $(this).parents('.listing'),
      itemsContainer = $($(this).parents('[data-link-container]').data('link-container')),
      data = {
        ajax: 'filter',
      };

    container.addClass('active');

    data[$(this).data('field')] = $(this).val();

    $.ajax({
      type: 'GET',
      url: window.location.href,
      dataType: 'html',
      data: data,
      success: function(r) {
        container.removeClass('active');
        itemsContainer.empty();
        itemsContainer.append($(r).children());
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

function forms() {
  $(document).on('submit', '[data-type=form-backend]', function(e) {
    e.preventDefault();

    const form = $(this),
      action = form.attr('action'),
      file = form.find('input[name=file]'),
      data = file.length ? new FormData() : {};

    form.find('[data-type=get-field], input:checked').each(function() {
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
