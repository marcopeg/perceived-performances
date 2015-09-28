
// reset original page content
$(document).on('keyup', function(e) {
    if (e.keyCode === 27) {
        $('#content').html('');
    };
});
