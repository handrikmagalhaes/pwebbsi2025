// Funcao para ativar ou desativar o alto contraste.

$(document).ready(function () {
    $('#btn-a-contraste,#a-contraste').click(function () {
        // Pega o valor atual do cookie
        var contraste = valorCookie("contraste");
        if (contraste !== 'sim') { // Aplica o contraste
          document.documentElement.classList.add('contraste');
          document.cookie = "contraste=sim; path=/";
        } else {  // Remove o contraste
          document.documentElement.classList.remove('contraste');
          document.cookie = "contraste=; Max-Age=0; path=/";
        }
    });
});