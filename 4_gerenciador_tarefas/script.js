const formTarefa = document.getElementById("formTarefa");

const textoTarefa = document.getElementById("textoTarefa");

const categoriaTarefa = document.getElementById("categoriaTarefa");

const listaTarefas = document.getElementById("listaTarefas");

const limparConcluidas =
    document.getElementById("limparConcluidas");

const botoesFiltro =
    document.querySelectorAll(".filtro");


let tarefas = [];

let filtroAtual = "Todas";


// ADICIONAR TAREFA

formTarefa.addEventListener("submit", function(event) {

    event.preventDefault();

    const texto = textoTarefa.value.trim();

    const categoria = categoriaTarefa.value;


    // Verifica se o campo está vazio

    if (texto === "") {

        alert("Digite uma tarefa antes de adicionar.");

        textoTarefa.focus();

        return;
    }


    const novaTarefa = {

        id: Date.now(),

        texto: texto,

        categoria: categoria,

        concluida: false

    };


    tarefas.push(novaTarefa);


    textoTarefa.value = "";

    textoTarefa.focus();


    mostrarTarefas();

});


// MOSTRAR TAREFAS

function mostrarTarefas() {

    listaTarefas.innerHTML = "";


    const tarefasFiltradas = tarefas.filter(function(tarefa) {

        if (filtroAtual === "Todas") {

            return true;

        }

        return tarefa.categoria === filtroAtual;

    });


    if (tarefasFiltradas.length === 0) {

        listaTarefas.innerHTML = `
            <p class="vazio">
                Nenhuma tarefa encontrada.
            </p>
        `;

        return;
    }


    tarefasFiltradas.forEach(function(tarefa) {

        const elemento = document.createElement("div");

        elemento.classList.add("tarefa");


        if (tarefa.concluida) {

            elemento.classList.add("concluida");

        }


        const classeCategoria =
            tarefa.categoria.toLowerCase();


        elemento.innerHTML = `

            <input
                type="checkbox"
                class="checkbox"
                ${tarefa.concluida ? "checked" : ""}
            >

            <div class="conteudo-tarefa">

                <div class="texto-tarefa">
                    ${escaparHTML(tarefa.texto)}
                </div>

                <span class="categoria ${classeCategoria}">
                    ${tarefa.categoria}
                </span>

            </div>

            <button class="btn-remover">
                Remover
            </button>

        `;


        // Checkbox

        const checkbox =
            elemento.querySelector(".checkbox");


        checkbox.addEventListener("change", function() {

            tarefa.concluida = checkbox.checked;

            mostrarTarefas();

        });


        // Botão remover

        const botaoRemover =
            elemento.querySelector(".btn-remover");


        botaoRemover.addEventListener("click", function() {

            tarefas = tarefas.filter(function(item) {

                return item.id !== tarefa.id;

            });

            mostrarTarefas();

        });


        listaTarefas.appendChild(elemento);

    });

}


// FILTROS

botoesFiltro.forEach(function(botao) {

    botao.addEventListener("click", function() {

        filtroAtual = botao.dataset.filtro;


        botoesFiltro.forEach(function(item) {

            item.classList.remove("ativo");

        });


        botao.classList.add("ativo");


        mostrarTarefas();

    });

});


// LIMPAR TAREFAS CONCLUÍDAS

limparConcluidas.addEventListener("click", function() {

    tarefas = tarefas.filter(function(tarefa) {

        return !tarefa.concluida;

    });


    mostrarTarefas();

});


// PROTEÇÃO CONTRA HTML

function escaparHTML(texto) {

    const div = document.createElement("div");

    div.textContent = texto;

    return div.innerHTML;

}


// Inicialização

mostrarTarefas();