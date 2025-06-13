$(document).ready(function () {
    $('#div-login').delay(300).toggleClass('mostra-login-inicial');
});

$(document).ready(function () {
    $('#recupera-senha').on('click', function () {
        $('#form-1').css({"transform": "translateX(-15px)"}).fadeToggle(200);
        $('#form-2').delay(200).fadeToggle(500);
    });
});

$(document).ready(function () {
    $('#voltar-login').on('click', function () {
        $('#form-2').fadeToggle(200);
        $('#form-1').delay(300).fadeToggle(300).css({"transform": "translateX(0px)"});
    });
});