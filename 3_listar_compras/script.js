const itemInput = document.getElementById("itemInput");
const adicionarBtn = document.getElementById("adicionarBtn");

const listaComprar = document.getElementById("listaComprar");
const listaComprados = document.getElementById("listaComprados");

const contadorComprar = document.getElementById("contadorComprar");
const contadorComprados = document.getElementById("contadorComprados");

let itens = [];

// Adicionar item
adicionarBtn.addEventListener("click", adicionarItem);

// Permitir adicionar pressionando Enter
itemInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        adicionarItem();
    }
});

function adicionarItem() {
    const nome = itemInput.value.trim();

    if (nome === "") {
        alert("Digite o nome de um item.");
        return;
    }

    const item = {
        id: Date.now(),
        nome: nome,
        comprado: false
    };

    itens.push(item);

    itemInput.value = "";

    mostrarItens();
}

// Mostrar os itens na tela
function mostrarItens() {

    listaComprar.innerHTML = "";
    listaComprados.innerHTML = "";

    const itensParaComprar = itens.filter(item => !item.comprado);
    const itensComprados = itens.filter(item => item.comprado);

    // Itens a comprar
    if (itensParaComprar.length === 0) {
        listaComprar.innerHTML =
            '<li class="vazio">Nenhum item para comprar.</li>';
    } else {
        itensParaComprar.forEach(item => {
            listaComprar.appendChild(criarElemento(item));
        });
    }

    // Itens comprados
    if (itensComprados.length === 0) {
        listaComprados.innerHTML =
            '<li class="vazio">Nenhum item comprado.</li>';
    } else {
        itensComprados.forEach(item => {
            listaComprados.appendChild(criarElemento(item));
        });
    }

    // Atualizar contadores
    contadorComprar.textContent = itensParaComprar.length;
    contadorComprados.textContent = itensComprados.length;
}

// Criar elemento visual do item
function criarElemento(item) {

    const li = document.createElement("li");
    li.classList.add("item");

    if (item.comprado) {
        li.classList.add("comprado");
    }

    // Checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("checkbox");
    checkbox.checked = item.comprado;

    checkbox.addEventListener("change", function() {
        marcarComoComprado(item.id);
    });

    // Nome
    const nome = document.createElement("span");
    nome.textContent = item.nome;

    // Botão remover
    const removerBtn = document.createElement("button");
    removerBtn.textContent = "Remover";
    removerBtn.classList.add("remover");

    removerBtn.addEventListener("click", function() {
        removerItem(item.id);
    });

    li.appendChild(checkbox);
    li.appendChild(nome);
    li.appendChild(removerBtn);

    return li;
}

// Marcar item como comprado
function marcarComoComprado(id) {

    const item = itens.find(item => item.id === id);

    if (item) {
        item.comprado = !item.comprado;
    }

    mostrarItens();
}

// Remover item
function removerItem(id) {

    itens = itens.filter(item => item.id !== id);

    mostrarItens();
}

// Mostrar a lista inicialmente
mostrarItens();