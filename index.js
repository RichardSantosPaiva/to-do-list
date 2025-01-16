var id = null;
var linha = null;

function incluirItem(){
    id++
    const tarefa = document.getElementById("input-item").value
    const tbodyItens = document.getElementById("table-itens")
    const tr = document.createElement("tr")
    const th = document.createElement("th")
    const td1 =  document.createElement("td")
    const td2 = document.createElement("td")
    const btnDeletar = document.createElement("button")
    const btnEditar = document.createElement("button")

    const input = document.createElement("input");
    tr.setAttribute("id", `tr-${id}`)
    th.innerText =  id;
    th.setAttribute("scope", "row")
    input.setAttribute("type","text")
    input.value = tarefa
    btnDeletar.setAttribute("onclick","deletar(this)")
    btnEditar.setAttribute("onclick",`editar(this, ${id})`)
    btnDeletar.innerText     =  "Deletar"
    btnEditar.innerText = "Editar"
    
    linha = tr;

    td1.appendChild(input)
    td1.appendChild(btnDeletar)
    td2.appendChild(btnEditar)
    tr.appendChild(th);
    tr.appendChild(td1)
    tr.appendChild(td2)
    tbodyItens.appendChild(tr)
  
    $('#exampleModal').on('hide.bs.modal', function (event) {
        console.log('modal fechou');
        document.getElementById("input-item").value = ""
    });
}



function editar(btn, id){
        let idPai = btn.parentNode.parentNode.getAttribute('id')
        idPai =  parseInt(idPai.substr(3))

        if(idPai === id ){
            let elementoPai = btn.parentNode.parentNode;
            console.log("editando valor digitado")
            console.log(elementoPai.children[1].children[0].value)
        }else {
            alert("id e id do item não conferem")
        }

}

function deletar(btn){
    if(btn.parentNode.parentNode){
        console.log("pronto para deletar o elemento html ")
        btn.parentNode.parentNode.remove()
    }

}