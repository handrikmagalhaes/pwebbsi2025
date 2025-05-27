
// Abrir menu ao clicar no ícone
// em telas de menor tamanho.

$(document).ready(function () {
    $('#btnMenu').on('click', function () {
        $('#menu').toggleClass('abrir-menu shadow');
        $('#btnMenuIcon').toggleClass('bi-list bi-x');
        $('#fecha-menu').fadeToggle();
    });
});

// Fechar menu ao clicar na area escura
// da pagina.

$(document).click(function(){
    $('#a-fecha-menu').click(function () {
        $('#menu').removeClass('abrir-menu shadow');
        $('#btnMenuIcon').removeClass('bi-x');
        $('#btnMenuIcon').addClass('bi-list');
        $('#fecha-menu').fadeOut();
        return false;
    });
});