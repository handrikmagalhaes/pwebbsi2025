// Funcao para pegar o valor de um cookie

function valorCookie(nome_cookie) {
    var valor_cookie = document.cookie.match('('+nome_cookie+'=)[^;]*');
    if (!!valor_cookie) {
        var valor = valor_cookie[0].replace(valor_cookie[1],"")
        return valor;
    }
    else {
        return null;
    }
}

// Chama a função e pega o valor do tema aplicado (se existir)

var tema = valorCookie("tema");

// Seta o prazo de validade do cookie para 1 ano

var cookieExpira = new Date();
    cookieExpira.setFullYear(cookieExpira.getFullYear() + 1);

// Se o cookie ja existir, aplica-se tema correspondente.
// Se nao existir, aplica o tema padrao.

if (tema === 'light') {
    document.documentElement.classList.add('light');
    document.cookie = "tema=light; expires="+ cookieExpira +"; path=/";
    var cor_label = "#535353";
    var cor_grid = "#F0F0F0";
} else if (tema === 'verde') {
    document.documentElement.classList.add('verde');
    document.cookie = "tema=verde; expires="+ cookieExpira +"; path=/";  
    var cor_label = "#535353";
    var cor_grid = "#E0E0E0";
} else if (tema === 'escuro') {
    document.documentElement.classList.add('escuro');
    document.cookie = "tema=escuro; expires="+ cookieExpira +"; path=/";  
    var cor_label = "#FFF";
    var cor_grid = "#37426E";
} else {
    document.documentElement.classList.add('light');
    document.cookie = "tema=light; expires="+ cookieExpira +"; path=/";  
    var cor_label = "#535353";
    var cor_grid = "#F0F0F0";
}