// Selecionar o tema entre Light, Verde ou Escuro.

$(document).ready(function () {
    $('#a-light').click(function () {
        document.documentElement.classList.add('light');
        document.documentElement.classList.remove('verde');
        document.documentElement.classList.remove('escuro');
        document.cookie = "tema=light; expires="+ cookieExpira +"; path=/";
        var cor_label = "#535353";
        var cor_grid = "#F0F0F0";
        recarrega_chart(cor_label,cor_grid);
        return false;
    });
      $('#a-verde').click(function () {
        document.documentElement.classList.remove('light');
        document.documentElement.classList.add('verde');
        document.documentElement.classList.remove('escuro');
        document.cookie = "tema=verde; expires="+ cookieExpira +"; path=/";
        var cor_label = "#535353";
        var cor_grid = "#E0E0E0";
        recarrega_chart(cor_label,cor_grid);
        return false;
    });
      $('#a-escuro').click(function () {
        document.documentElement.classList.remove('light');
        document.documentElement.classList.remove('verde');
        document.documentElement.classList.add('escuro');
        document.cookie = "tema=escuro; expires="+ cookieExpira +"; path=/";
        var cor_label = "#FFF";
        var cor_grid = "#37426E";
        recarrega_chart(cor_label,cor_grid);
        return false;
    });
});

// Bloqueia o dropdown ao escolher o tema

$(document).on('click', '#botao_usuario .dropdown-menu .tema', function (e) {
  e.stopPropagation();
});