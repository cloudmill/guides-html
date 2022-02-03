$(function() {
  forms();
  selectItem();
  filter();
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
    $(`[data-form=${$(this).closest('[data-form-type-container]').data('form-type')}]`).find('[data-field=sectionId]').val($(this).data('id'));
  });
}

function filter() {
  $(document).on('click', '[data-filter]', function() {
    const thisObj = $(this),
      data = {
        'ajax': thisObj.data('ajax'),
      };

    data[thisObj.data('field')] = thisObj.data('value');

    $.ajax({
      type: 'GET',
      url: window.location.href,
      dataType: 'html',
      data: data,
      success: function(r) {
        thisObj.closest('[tabs-container]').find('active').removeClass('active');
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
