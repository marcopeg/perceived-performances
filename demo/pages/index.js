
// reset original page content
$(document).on('keyup', function(e) {
    if (e.keyCode === 27) {
        $('#content').html('');
    };
});

function loadingFadeIn() {
	$('#loading-curtain').addClass('fading-active fading-visible');
}

function loadingFadeOut() {
	$('#loading-curtain').removeClass('fading-visible');
    setTimeout(function() {
        $('#loading-curtain').removeClass('fading-active');
    }, 200);
}
