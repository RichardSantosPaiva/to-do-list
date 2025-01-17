var id = null

$('#modal-criar-item').on('hide.bs.modal', function (evento) {
    console.log('modal fechou');
    document.getElementById("input-item").value = ""
});

function incluirItem() {
    id++
    const textoParagrafo = document.getElementById("input-item").value
    const tbodyItens = document.getElementById("table-itens")
    const tr = document.createElement("tr")
    const th = document.createElement("th")
    const td1 = document.createElement("td")
    const td2 = document.createElement("td")
    const btnDeletar = document.createElement("button")
    const btnEditar = document.createElement("button")
    const p = document.createElement("p")
    const input = document.createElement("input");

    tr.setAttribute("id", `tr-${id}`)

    th.innerText = id;
    th.setAttribute("scope", "row")

    p.innerText = textoParagrafo
    btnDeletar.setAttribute("class", "btn btn-danger");
    btnEditar.setAttribute("class", "btn btn-primary");

    input.setAttribute("type", "text")
    input.value = textoParagrafo
    input.style.display = 'none';

    btnDeletar.setAttribute("onclick", "deletar(this)")
    btnEditar.setAttribute("onclick", `editar(this, ${id})`)
    btnDeletar.innerText = "Deletar"
    btnEditar.innerText = "Editar"

    td1.appendChild(p)
    td1.appendChild(input)
    td1.appendChild(btnDeletar)
    td2.appendChild(btnEditar)
    tr.appendChild(th);
    tr.appendChild(td1)
    tr.appendChild(td2)
    tbodyItens.appendChild(tr)
}

function editar(btn, id) {
    let idPai = btn.parentNode.parentNode.getAttribute('id')
    var linhaPai = btn.parentNode.parentNode
    idPai = parseInt(idPai.substr(3))

    if (idPai === id) {
        let elementoPai = btn.parentNode.parentNode;
        let td1 = elementoPai.children[1];
        let td2 = elementoPai.children[2];
        let p = td1.children[0];
        let input = td1.children[1]

        if (p.style.display !== "none") {
            p.style.display = "none"
            input.style.display = "block"

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
    } else {
        alert("id e id do item não conferem")
    }
}

function salvar(id) {
    let linha = document.getElementById(`tr-${id}`)
    let td = linha.children[1]
    let input = td.children[1]
    alert("valor do input editado: " + input.value)
}

function cancelar(id) {
    let linha = document.getElementById(`tr-${id}`)
    let td = linha.children[1]
    let td2 = linha.children[2]
    let p = td.children[0]
    let input = td.children[1]
    let btnCancelar = document.getElementById(`btn-cancelar-${id}`)
    let btnSalvar = document.getElementById(`btn-salvar-${id}`);

    p.style.display = "block"
    input.style.display = "none"

    btnCancelar.remove()
    btnSalvar.remove()

    const btnEditar = document.createElement("button")
    btnEditar.setAttribute("class", "btn btn-primary");
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


let calendario = new Date();
let anoAtual = calendario.getFullYear()
let mesAtual = calendario.getMonth()


function agenda(condicao) {
    let arrayMeses = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"]    
    mesAtual = condicao != null ? condicao : mesAtual
    
    const container = document.getElementById("container-calendario")
    container.innerHTML = ""; 

    const btnEsquerda = document.createElement("button")
    const btnDireita = document.createElement("button")
    btnEsquerda.setAttribute("id", "esquerda");
    btnDireita.setAttribute("id", "direita");
    btnEsquerda.innerText = "<-";
    btnDireita.innerText = "->";

    const div = document.createElement("div");
    div.style.display = "flex";
    div.style.justifyContent = "space-evenly";
    div.style.alignItems = "center";
    div.setAttribute("class", "container-botao");
    div.appendChild(btnEsquerda);
    div.appendChild(btnDireita);

    let calendario = document.createElement("div");
    calendario.setAttribute("id", "calendario");

    let calendario_datas = document.createElement("div");
    calendario_datas.setAttribute("id", "calendario-datas");

    let p = document.createElement("p");
    p.innerText = `Calendário  ${arrayMeses[mesAtual]} ${anoAtual}`

    for (let i = 1; i <= 31; i++) {        
        let span = document.createElement("span");
        span.innerText = i;

        if(mesAtual == 1){
            if(i == 29){
                break 
            }
        }

        if(mesAtual == 3 || mesAtual == 5 || mesAtual == 8 || mesAtual == 10) {
            if(i == 31){
                break
            }
        } 

        calendario_datas.appendChild(span);
    }

    calendario.appendChild(p);
    calendario.appendChild(calendario_datas);
    container.appendChild(calendario);
    container.appendChild(div);

    btnEsquerda.addEventListener("click", () => {
        if (mesAtual > 1) { 
            agenda(mesAtual - 1);
        }
    });

    btnDireita.addEventListener("click", () => {
        if (mesAtual < 12) {    
            agenda(mesAtual + 1);
        }
    });
}

document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM completamente carregado e analisado");
    agenda(mesAtual); 
});