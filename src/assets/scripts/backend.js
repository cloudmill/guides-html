$(function() {
  forms();
  selectItem();
});

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
      error: function(xhr, status, error) {
        alert(`error: ${xhr.status}: ${xhr.statusText}`);
      }
    });
  });
}

function selectItem() {
  $(document).on('click', '[data-select-item]', function() {
    $(`[data-form=${$(this).closest('[data-container=tabs-container]').data('form-type')}]`).find('[data-field=sectionId]').val($(this).data('id'));
  });
}
