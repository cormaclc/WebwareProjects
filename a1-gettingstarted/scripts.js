$(document).ready(function () {
    $(".tech-green, .tech-red, .tech-yellow").hover(function () {
        $(".tech-experience", this).toggle();
        $(".tech-title", this).toggle();
    });

    $('#more').click(function() {
        $('.second').show();
        $('#more').hide();
        $('#less').show();
    });

    $('#less').click(function() {
        $('.second').hide();
        $('#less').hide();
        $('#more').show();
    })
});