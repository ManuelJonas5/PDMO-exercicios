// ========================================
// DADOS SEPARADOS
// ========================================

let itensComprar =
    JSON.parse(localStorage.getItem("itensComprar")) || [];

let itensComprados =
    JSON.parse(localStorage.getItem("itensComprados")) || [];


// ========================================
// ELEMENTOS DA PÁGINA
// ========================================

const itemInput = document.getElementById("itemInput");
const adicionarBtn = document.getElementById("adicionarBtn");
const continuarBtn = document.getElementById("continuarBtn");
const selecionarTudo =document.getElementById("selecionarTudo");


// ========================================
// PÁGINA "A COMPRAR"
// ========================================

if (adicionarBtn) {

    adicionarBtn.addEventListener("click", adicionarItem);

    itemInput.addEventListener("keypress", function(event) {

        if (event.key === "Enter") {
            adicionarItem();
        }

    });

    mostrarListaComprar();
}


function adicionarItem() {

    const nome = itemInput.value.trim();

    if (nome === "") {
        alert("Digite um item.");
        return;
    }

    const novoItem = {
        id: Date.now(),
        nome: nome,
        selecionado: false
    };

    itensComprar.push(novoItem);

    salvarItensComprar();

    itemInput.value = "";

    mostrarListaComprar();
}


function mostrarListaComprar() {

    const lista = document.getElementById("listaComprar");

    if (!lista) return;

    lista.innerHTML = "";

    if (itensComprar.length === 0) {

        lista.innerHTML =
            '<li class="vazio">Nenhum item adicionado.</li>';

        return;
    }

    itensComprar.forEach(item => {

        const li = document.createElement("li");

        li.classList.add("item");

        if (item.selecionado) {
            li.classList.add("selecionado");
        }


        // Checkbox
        const checkbox = document.createElement("input");

        checkbox.type = "checkbox";
        checkbox.classList.add("checkbox");
        checkbox.checked = item.selecionado;


        checkbox.addEventListener("click", function(event) {

            event.stopPropagation();

            selecionarItem(item.id);

        });


        // Nome do item
        const nome = document.createElement("span");

        nome.textContent = item.nome;
        nome.classList.add("nome-item");


        // Botão remover
        const remover = document.createElement("button");

        remover.textContent = "Remover";
        remover.classList.add("remover");


        remover.addEventListener("click", function(event) {

            event.stopPropagation();

            removerItemComprar(item.id);

        });


        li.appendChild(checkbox);
        li.appendChild(nome);
        li.appendChild(remover);


        // Clicar no item também seleciona
        li.addEventListener("click", function() {

            selecionarItem(item.id);

        });


        lista.appendChild(li);

    });
}


// ========================================
// SELECIONAR ITEM
// ========================================

function selecionarItem(id) {

    const item = itensComprar.find(
        item => item.id === id
    );

    if (!item) return;

    item.selecionado = !item.selecionado;

    salvarItensComprar();

    mostrarListaComprar();
}


// ========================================
// REMOVER DA PÁGINA "A COMPRAR"
// ========================================

function removerItemComprar(id) {

    itensComprar = itensComprar.filter(
        item => item.id !== id
    );

    salvarItensComprar();

    mostrarListaComprar();
}


// ========================================
// BOTÃO CONTINUAR
// ========================================

if (continuarBtn) {

    continuarBtn.addEventListener("click", function() {

        const selecionados = itensComprar.filter(
            item => item.selecionado
        );


        if (selecionados.length === 0) {

            alert("Selecione pelo menos um item.");

            return;
        }


        // Copiar os itens selecionados
        selecionados.forEach(item => {

            // Evitar duplicados
            const jaExiste = itensComprados.some(
                comprado => comprado.id === item.id
            );


            if (!jaExiste) {

                itensComprados.push({
                    id: item.id,
                    nome: item.nome
                });

            }

        });


        salvarItensComprados();


        // Ir para a página de comprados
        window.location.href = "comprado.html";

    });

}


// ========================================
// PÁGINA "COMPRADOS"
// ========================================

const listaComprados =
    document.getElementById("listaComprados");


if (listaComprados) {

    mostrarComprados();

}


function mostrarComprados() {

    listaComprados.innerHTML = "";


    if (itensComprados.length === 0) {

        listaComprados.innerHTML =
            '<li class="vazio">Nenhum item comprado.</li>';

        return;
    }


    itensComprados.forEach(item => {

        const li = document.createElement("li");

        li.classList.add("item", "selecionado");


        // Nome
        const nome = document.createElement("span");

        nome.textContent = item.nome;
        nome.classList.add("nome-item");


        // Botão remover
        const remover = document.createElement("button");

        remover.textContent = "Remover";
        remover.classList.add("remover");


        remover.addEventListener("click", function() {

            removerItemComprado(item.id);

        });


        li.appendChild(nome);
        li.appendChild(remover);

        listaComprados.appendChild(li);

    });

}


// ========================================
// REMOVER SOMENTE DOS "COMPRADOS"
// ========================================

function removerItemComprado(id) {

    itensComprados = itensComprados.filter(
        item => item.id !== id
    );

    salvarItensComprados();

    mostrarComprados();
}


// ========================================
// LOCAL STORAGE
// ========================================

function salvarItensComprar() {

    localStorage.setItem(
        "itensComprar",
        JSON.stringify(itensComprar)
    );

}


function salvarItensComprados() {

    localStorage.setItem(
        "itensComprados",
        JSON.stringify(itensComprados)
    );

}
// ========================================
// SELECIONAR TODOS
// ========================================

if (selecionarTudo) {

    selecionarTudo.addEventListener("change", function() {

        const marcar = selecionarTudo.checked;

        itensComprar.forEach(item => {
            item.selecionado = marcar;
        });

        salvarItensComprar();

        mostrarListaComprar();

        atualizarSelecionarTudo();

    });

}
function atualizarSelecionarTudo() {

    if (!selecionarTudo) return;

    if (itensComprar.length === 0) {

        selecionarTudo.checked = false;
        return;

    }

    selecionarTudo.checked =
        itensComprar.every(item => item.selecionado);

}