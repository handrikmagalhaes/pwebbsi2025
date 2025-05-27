// Selecionar o tema entre Light, Verde ou Escuro.

$(document).ready(function () {
    $('#a-light').click(function () {
        document.documentElement.classList.add('light');
        document.documentElement.classList.remove('verde');
        document.documentElement.classList.remove('escuro');
        document.cookie = "tema=light; expires="+ cookieExpira +"; path=/";
        return false;
    });
      $('#a-verde').click(function () {
        document.documentElement.classList.remove('light');
        document.documentElement.classList.add('verde');
        document.documentElement.classList.remove('escuro');
        document.cookie = "tema=verde; expires="+ cookieExpira +"; path=/";
        return false;
    });
      $('#a-escuro').click(function () {
        document.documentElement.classList.remove('light');
        document.documentElement.classList.remove('verde');
        document.documentElement.classList.add('escuro');
        document.cookie = "tema=escuro; expires="+ cookieExpira +"; path=/";
        return false;
    });
});

// Bloqueia o dropdown ao escolher o tema

$(document).on('click', '#botao_usuario .dropdown-menu .tema', function (e) {
  e.stopPropagation();
});