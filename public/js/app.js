$(document).ready(function() {
  $('.deleteButton').on('click', function(e) {
    e.preventDefault();
    console.log($(this));

    var route = $(this).attr('action');
    var id = $(this).attr('value');
    console.log('******************************************************************')
    console.log($(this).attr('value'));
    var thisButton = this;
    $.ajax({
      method: 'DELETE',
      url: route + '/' + id,
      success: function(response) {
        console.log('delete success');
        $(thisButton).parent().remove();
      },
      error: function(xhr, ajaxOptions, thorwnError) {
        console.log('hit ajax delete error');
      }
    });
  });



});
