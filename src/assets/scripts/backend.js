$(function() {
  forms();
  selectItem();
  filter();
  pageNav();
  modalAjax();
});

function ajaxCallbackErrors(xhr) {
  alert(`error: ${xhr.status}: ${xhr.statusText}`);
}

function forms() {
  $(document).on('submit', '[data-type=form-backend]', function(e) {
    e.preventDefault();

    const form = $(this),
      data = {};

    form.find('[data-type=get-field]').each(function() {
      data[$(this).data('field')] = $(this).val();
    });

    $.ajax({
      type: 'POST',
      url: form.attr('action') ? form.attr('action') : `${window.CONFIG.path}/include/ajax/forms/index.php`,
      dataType: 'json',
      data: data,
      success: function(r) {
        if (r.success) {
          form.attr('data-form-hidden', '');
          form.find('[data-type=form-response]').attr('data-response-active', '');
        } else {
          alert(r.message);
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
