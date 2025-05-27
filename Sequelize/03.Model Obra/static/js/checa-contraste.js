// Funcao para pegar o valor do cookie de contraste
// e aplicar o contraste, se tiver sido selecionado.

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

var contraste = valorCookie("contraste");

if (contraste === 'sim') {
    document.documentElement.classList.add('contraste');
    document.cookie = "contraste=sim; path=/";
}