function calcular(operacao) {

    const campoNumero1 = document.getElementById("numero1");
    const campoNumero2 = document.getElementById("numero2");

    const resultadoElemento = document.getElementById("resultado");
    const mensagemElemento = document.getElementById("mensagem");

    const valor1 = campoNumero1.value.trim();
    const valor2 = campoNumero2.value.trim();

    // Limpa mensagens anteriores
    mensagemElemento.textContent = "";

    // Verifica se os campos estão preenchidos
    if (valor1 === "" || valor2 === "") {

        resultadoElemento.textContent = "---";

        mensagemElemento.textContent =
            "Por favor, preencha os dois campos.";

        return;
    }

    const numero1 = Number(valor1);
    const numero2 = Number(valor2);

    // Verifica se os valores são números válidos
    if (!Number.isFinite(numero1) || !Number.isFinite(numero2)) {

        resultadoElemento.textContent = "---";

        mensagemElemento.textContent =
            "Digite valores numéricos válidos.";

        return;
    }

    let resultado;

    switch (operacao) {

        case "+":

            resultado = numero1 + numero2;

            break;

        case "-":

            resultado = numero1 - numero2;

            break;

        case "*":

            resultado = numero1 * numero2;

            break;

        case "/":

            // Tratamento da divisão por zero
            if (numero2 === 0) {

                resultadoElemento.textContent = "---";

                mensagemElemento.textContent =
                    "Não é possível dividir por zero.";

                return;
            }

            resultado = numero1 / numero2;

            break;

        default:

            resultadoElemento.textContent = "---";

            mensagemElemento.textContent =
                "Operação inválida.";

            return;
    }

    // Evita resultados infinitos ou inválidos
    if (!Number.isFinite(resultado)) {

        resultadoElemento.textContent = "---";

        mensagemElemento.textContent =
            "Não foi possível calcular o resultado.";

        return;
    }

    // Mostra o resultado
    resultadoElemento.textContent = resultado;
}


// Limpar todos os campos
function limpar() {

    document.getElementById("numero1").value = "";
    document.getElementById("numero2").value = "";

    document.getElementById("resultado").textContent = "---";

    document.getElementById("mensagem").textContent = "";
}