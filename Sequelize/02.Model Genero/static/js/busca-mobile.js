// Funcao para exibir ou ocultar busca mobile.

$(document).ready(function () {
    $('#a-fecha-busca,#botao-nav1').on('click', function () {
        // Se nao tiver a classe ativo, ele exibe a busca
        if (!$('#busca-mobile').hasClass("active")) {
            $('#busca-mobile').toggleClass('active shadow');
            $('#fecha-busca').fadeToggle();
            $('#busca-nav-mobile').focus();
            // Se tiver a classe ativo, ele oculta a busca
        } else {
            $('#busca-nav-mobile').focusout();
            $('#busca-mobile').removeClass('active shadow');
            $('#fecha-busca').fadeOut();
            return false;
        }
    });
});