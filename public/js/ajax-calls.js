$(document).ready(function() {
  $('.delete-btn').click(function(e) {
    e.preventDefault();
    const url = $(this).attr('href');

    $.ajax({
      url,
      method: 'DELETE'
    }).done(function(res) {
      // console.log('success:', res);
      window.location = '/' + url.split('/')[1];
    }).fail(function(err) {
      console.log('error', err);
    });
  });

  $('#edit-tag').submit(function(e) {
    e.preventDefault();
    console.log('about to submit PUT req');
    $.ajax({
      url: $(this).attr('action'),
      method: 'PUT',
      data: $(this).serialize()
    }).done(function(res) {
      console.log('success', res);
    }).fail(function(err) {
      console.log('error', err);
    });
  });

});
