const listaNegra = [
    "banco-falso.com",
    "itau-seguro-login.com",
    "promocao-premium.xyz",
    "login-seguro.net",
    "pix-confirmar.com"
];

function verificarURL() {
    let url = document.getElementById("urlInput").value.trim();
    let resultado = document.getElementById("resultado");
    let botao = document.getElementById("botaoVerificar");

    if (!url) {
        mostrarResultado("Por favor, insira uma URL.", "⚠️", "resultado-perigoso", "perigoso");
        return;
    }

    try {
        let urlObj = new URL(url);
        let dominio = urlObj.hostname;

        botao.disabled = true;
        botao.textContent = "Verificando...";
        resultado.innerHTML = "⏳ Verificando...";
        resultado.className = "";
        document.body.classList.remove("seguro", "perigoso");

        setTimeout(() => {
            if (!validarFormato(url)) {
                mostrarResultado("URL inválida! Verifique e tente novamente.", "❌", "resultado-perigoso", "perigoso");
            } else if (listaNegra.includes(dominio)) {
                mostrarResultado("ATENÇÃO: Este site está listado como malicioso!", "🚨", "resultado-perigoso", "perigoso");
            } else if (dominioSuspeito(dominio)) {
                mostrarResultado("Atenção! Este domínio pode ser suspeito.", "⚠️", "resultado-suspeito", "perigoso");
            } else {
                mostrarResultado("URL parece segura.", "✅", "resultado-seguro", "seguro");
            }

            botao.disabled = false;
            botao.textContent = "Verificar";
        }, 1500);

    } catch (error) {
        mostrarResultado("URL inválida!", "❌", "resultado-perigoso", "perigoso");
    }
}

function validarFormato(url) {
    let regex = /^(https?:\/\/)?([\w\-]+\.)+[\w\-]{2,}$/;
    return regex.test(url);
}

function dominioSuspeito(dominio) {
    let padroesSuspeitos = [
        /.*\-secure\-.*/, 
        /.*\-login\-.*/, 
        /.*bancoseguro.*/, 
        /.*\d{5,}.*/, 
        /.*\..*\..*\..*/ 
    ];
    return padroesSuspeitos.some(padrao => padrao.test(dominio));
}

function mostrarResultado(mensagem, icone, classeResultado, classeFundo) {
    let resultado = document.getElementById("resultado");
    let body = document.body;

    resultado.innerHTML = `${icone} ${mensagem}`;
    resultado.className = classeResultado;

    body.classList.remove("seguro", "perigoso");
    if (classeFundo) {
        body.classList.add(classeFundo);
    }
}