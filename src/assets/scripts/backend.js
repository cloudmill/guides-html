$(function() {
  forms();
});

function forms() {
  $(document).on('submit', '[data-type=form-backend]', function(e) {
    e.preventDefault();

    console.log('submit');
  });
}
