var id = null

$('#modal-criar-item').on('hide.bs.modal', function (evento) {
    console.log('modal fechou');
    document.getElementById("textarea-item").value = ""
});

function incluirItem() {
    id++
    const textoParagrafo = document.getElementById("textarea-item").value
    const tbodyItens = document.getElementById("table-itens")
    const tr = document.createElement("tr")
    const th = document.createElement("th")
    const td1 = document.createElement("td")
    const td2 = document.createElement("td")
    const btnDeletar = document.createElement("button")
    const btnEditar = document.createElement("button")
    const p = document.createElement("p")
    const textarea= document.createElement("textarea");

    tr.setAttribute("id", `tr-${id}`)

    th.innerText = id;
    th.setAttribute("scope", "row")
    th.style.textAlign = "center"
    p.innerText = textoParagrafo
    btnDeletar.setAttribute("id","deletar")
    btnDeletar.setAttribute("class", "btn btn-danger");
    btnEditar.setAttribute("class", "btn btn-warning");

    //class="form-control" aria-label="With textarea"
    textarea.setAttribute("class", "form-control");
    textarea.setAttribute("arial-label", "With textarea")
    textarea.value = textoParagrafo
    textarea.style.display = 'none';

    btnDeletar.setAttribute("onclick", "deletar(this)")
    btnEditar.setAttribute("onclick", `editar(this, ${id})`)
    btnDeletar.innerText = "Deletar"
    btnEditar.innerText = "Editar"

    td1.appendChild(p)
    td1.appendChild(textarea)
    td1.appendChild(btnDeletar)
    td2.appendChild(btnEditar)
    tr.appendChild(th);
    tr.appendChild(td1)
    tr.appendChild(td2)
    tbodyItens.appendChild(tr)
}

function editar(btn, id) {
    let idPai = btn.parentNode.parentNode.getAttribute('id')
    idPai = parseInt(idPai.substr(3))

    if (idPai === id) {
        let elementoPai = btn.parentNode.parentNode;
        let td1 = elementoPai.children[1];
        let td2 = elementoPai.children[2];
        let p = td1.children[0];
        let textarea = td1.children[1]

        if (p.style.display !== "none") {
            p.style.display = "none"
            textarea.style.display = "block"

            if (!document.getElementById(`btn-cancelar-${id}`)) {
                const btnCancelar = document.createElement("button")
                btnCancelar.setAttribute("id", `btn-cancelar-${id}`)
                btnCancelar.setAttribute("class", "btn  btn-warning");
                btnCancelar.innerText = "Cancelar"
                btnCancelar.setAttribute("onclick", `cancelar(${id})`)
                btnCancelar.style.marginLeft = "10px"
                td2.appendChild(btnCancelar)
            }

            btn.remove()
            var btnSalvar = document.createElement("button")
            btnSalvar.innerText = "Salvar"
            btnSalvar.setAttribute("id", `btn-salvar-${id}`)
            btnSalvar.setAttribute("class", "btn btn-success");
            btnSalvar.style.marginLeft = "10px"
            btnSalvar.setAttribute("onclick", `salvar(${id})`)
            td2.appendChild(btnSalvar)

        }
    } 
}

function salvar(id) {
    let linha = document.getElementById(`tr-${id}`)
    let td = linha.children[1]
    let textarea = td.children[1]
    alert("valor do input editado: " + textarea.value)
}

function cancelar(id) {
    let linha = document.getElementById(`tr-${id}`)
    let td = linha.children[1]
    let td2 = linha.children[2]
    let p = td.children[0]
    let textarea = td.children[1]
    let btnCancelar = document.getElementById(`btn-cancelar-${id}`)
    let btnSalvar = document.getElementById(`btn-salvar-${id}`);

    p.style.display = "block"
    textarea.style.display = "none"

    btnCancelar.remove()
    btnSalvar.remove()

    const btnEditar = document.createElement("button")
    btnEditar.setAttribute("class", "btn btn-warning");
    btnEditar.setAttribute("onclick", `editar(this, ${id})`)
    btnEditar.innerText = "Editar"
    td2.appendChild(btnEditar)

}

function deletar(btn) {
    if (btn.parentNode.parentNode) {
        console.log("pronto para deletar o elemento html ")
        btn.parentNode.parentNode.remove()
    }
}

var calendario = new Date()
var anoAtual = calendario.getFullYear()
var mesReferencia = calendario.getMonth()
console.log(mesReferencia)
let diaAtual = new Date().getDate(); // Armazena o dia atual
var removerEstiloBotao = null;

function anoBissexto(anoAtual){
    return (anoAtual % 4 === 0 && ano % 100 !== 0) || (anoAtual % 400 === 0)
}
 
var dataAtual = new Date();

function agenda(condicao) {
    mesComDiaMarcado = condicao

    let arrayMeses = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"]    
    mesAtual = condicao != null ? condicao : mesReferencia
    
    const container = document.getElementById("container-calendario")
    container.innerHTML = ""; 

    const btnEsquerda = document.createElement("button")
    const btnDireita = document.createElement("button")
    btnEsquerda.setAttribute("id", "esquerda")
    btnDireita.setAttribute("id", "direita")
    btnEsquerda.classList.add("btn", "btn-warning")
    btnDireita.classList.add("btn", "btn-warning")
    btnEsquerda.innerHTML =  "<img src='seta-esquerda.png'/>"
    btnDireita.innerHTML = "<img src='seta-direita.png'/>"

    const div = document.createElement("div")
    div.style.display = "flex"
    div.style.justifyContent = "space-evenly"
    div.style.alignItems = "center"
    div.setAttribute("class", "container-botao")
    div.appendChild(btnEsquerda)
    div.appendChild(btnDireita)

    let calendario = document.createElement("div")
    calendario.setAttribute("id", "calendario")

    let calendario_datas = document.createElement("div")
    calendario_datas.setAttribute("id", "calendario-datas")
    calendario_datas.setAttribute("class",`mes-${mesAtual}`)

    calendario_datas.innerHTML+="<p class='dias-da-semana'>D</p>"
    calendario_datas.innerHTML+="<p class='dias-da-semana'>S</p>"
    calendario_datas.innerHTML+="<p class='dias-da-semana'>T</p>"
    calendario_datas.innerHTML+="<p class='dias-da-semana'>Q</p>"
    calendario_datas.innerHTML+="<p class='dias-da-semana'>Q</p>"
    calendario_datas.innerHTML+="<p class='dias-da-semana'>S</p>"
    calendario_datas.innerHTML+="<p class='dias-da-semana'>S</p>"

    let p = document.createElement("p");
    
    p.innerText = `${arrayMeses[mesAtual]} - ${anoAtual}`

    for (let i = 1; i <= 31; i++) {        
        let botao = document.createElement("button");
        botao.setAttribute("id", `botao-${i}`)
        botao.setAttribute("onclick", `agendar(${i})`)
        botao.innerText = i;
        
        if(mesAtual == 1){
            if(anoBissexto(anoAtual)){
                if(i > 29) break
            } else {
                if(i > 28) break
            }
          
        }

        if(mesAtual == 3 || mesAtual == 5 || mesAtual == 8 || mesAtual == 10) {
            if(i == 31){
                break
            }
        } 

        if (condicao === mesReferencia && i === diaAtual ) {
            botao.classList.add("dia-atual");
            removerEstiloBotao = botao;
        }

        calendario_datas.appendChild(botao);
    }
    calendario.appendChild(p);
    calendario.appendChild(calendario_datas);
    container.appendChild(calendario);
    container.appendChild(div);

    btnEsquerda.addEventListener("click", () => {
        if (mesAtual > 0) { 
            agenda(mesAtual - 1);
        }
    });


    
    btnDireita.addEventListener("click", () => {
        if (mesAtual < 12) {    
            agenda(mesAtual + 1);
        }
    });
}


function agendar(diaSelecionado) {
    
    let botaoDiaAtual = document.getElementById(`botao-${diaAtual}`);
    let botao = document.getElementById(`botao-${diaSelecionado}`);
    let id = botao.innerText;
    
    if (removerEstiloBotao) {
        removerEstiloBotao.classList.remove("selecionado");
    }

    if (id.length === 2) { 
        botao.classList.add("selecionado");
    } else { 
        botao.classList.add("selecionado");
    }   
    
    removerEstiloBotao = botao;
}

document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM completamente carregado e analisado");
    agenda(mesReferencia); 

    setTimeout(() => {
        let botaoDia = document.getElementById(`botao-${diaAtual}`);

        if (botaoDia) {
            botaoDia.classList.add("dia-atual");
        } else {
            console.error(`Botão com id botao-${diaAtual} não foi encontrado.`);
        }
    }, 0)

});

//https://www.treinaweb.com.br/blog/slideshow-apenas-com-css  <- fazer um slide so copia o codigo

