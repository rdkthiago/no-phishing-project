function verificarURL() {
  let url = document.getElementById("urlInput").value.trim();
  let resultado = document.getElementById("resultado");

  if (!url) {
    resultado.textContent = "Por favor, insira uma URL.";
    resultado.style.color = "red";
    return;
  }

  try {
    let urlObj = new URL(url);
    let dominio = urlObj.hostname;

    if (!validarFormato(url)) {
      resultado.textContent = "URL inválida! Verifique e tente novamente.";
      resultado.style.color = "red";
      return;
    }

    if (dominioSuspeito(dominio)) {
      resultado.textContent = "Atenção! Este domínio pode ser suspeito.";
      resultado.style.color = "orange";
    } else {
      resultado.textContent = "Formato de URL válido.";
      resultado.style.color = "green";
    }
  } catch (error) {
    resultado.textContent = "URL inválida!";
    resultado.style.color = "red";
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
    /.*\..*\..*\..*/,
  ];
  return padroesSuspeitos.some((padrao) => padrao.test(dominio));
}
