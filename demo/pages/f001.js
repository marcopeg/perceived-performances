
$('.twitter-login input').not('[type="hidden"]').after('<span class="glyphicon glyphicon-circle-arrow-left" aria-hidden="true"></span>');

$(document).delegate('.twitter-login input', 'focus', function() {
    $(this).parent().addClass('active');
});

$(document).delegate('.twitter-login input', 'blur', function() {
    $(this).parent().removeClass('active');
});

$(document).delegate('#form3', 'submit', function(e) {
    e.stopPropagation();
    e.preventDefault();

    var $btn = $(this).find('.btn');
    var _html = $btn.html();

    $btn
        .blur()
        .addClass('animated pulse')
        .html('sending...');

    $.get($(this).attr('action') + '?delay=3000', function() {
        alert('done');
        $btn.html(_html).removeClass('animated pulse');
    });
});

$(document).delegate('#form4', 'submit', function(e) {
    e.stopPropagation();
    e.preventDefault();

    var $btn = $(this).find('.btn');
    var _html = $btn.html();

    $btn
        .blur()
        .addClass('animated pulse')
        .html('<div class="loading-icon"></div>');

    $.get($(this).attr('action') + '?delay=3000', function() {
        alert('done');
        $btn.html(_html).removeClass('animated pulse');
    });
});

$(document).delegate('#form5', 'submit', function(e) {
    e.stopPropagation();
    e.preventDefault();

    var $btn = $(this).find('.btn');
    var _html = $btn.html();

    $btn
        .blur()
        .addClass('animated pulse')
        .html('<div class="loading-icon"></div>');

    var t1 = setTimeout(function() {
        $btn.html('ready');
    }, 800);

    var t2 = setTimeout(function() {
        $btn.html('sent :-)');
    }, 1600);

    var t3 = setTimeout(function() {
        $btn.html('We\' re done here!');
    }, 2500);

    $.get($(this).attr('action') + '?delay=3000', function() {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
        alert('done');
        $btn.html(_html).removeClass('animated pulse');
    });

});
