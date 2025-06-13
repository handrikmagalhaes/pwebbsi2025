// Funcao para trocar os cards entre horizontal e vertical

$(document).ready(function () {
    $('#btnCartoes').on('click', function () {
        $('#container-cartoes').slideToggle(500, function() {
            $('#organiza-horizontal').toggleClass('bi-view-list bi-view-stacked', 1000);
            $('#cartoes-row').toggleClass('scrolling-wrapper flex-row flex-nowrap pt-2', 1000);
            $('#cartao-1').toggleClass('col-12 col-10', 1000);
            $('#cartao-2').toggleClass('col-12 col-10', 1000);
            $('#cartao-3').toggleClass('col-12 col-10', 1000);
            $('#cartao-4').toggleClass('col-12 col-10', 1000);
        });
        $('#container-cartoes').slideToggle(500);
    });
});

// Funcao para dar zoom nos graficos

$(document).ready(function () {
    $('#btnZoomGraficos1,#btnZoomGraficos2').on('click', function () {
        $('#grafico-1').toggleClass('col-md-6', 1000);
        $('#grafico-2').toggleClass('col-md-6', 1000);
    });
});