// Elementos
var matrizE = document.getElementById("matriz");
var toleranciaE = document.getElementById("tolerancia");
var btnMudarTema = document.getElementById("mudar-tema");
var btnExecutar = document.getElementById("executar");
var btnEx1 = document.getElementById("ex1");
var btnEx2 = document.getElementById("ex2");
var btnMostrarMais = document.getElementById("mostrar-mais");
var tblResultado = document.getElementById("resultado");
var saida = document.getElementById("saida");
var saidaMaisE = document.getElementById("saida-mais");
var resultadoMaisE = document.getElementById("resultado-mais");
var passosE = document.getElementById("passos");
// Botões
btnMudarTema.addEventListener('click', Theme.toggle);
btnExecutar.addEventListener('click', ()=>{
    let A, eps, resultado;
    A = Input.stringToMatrix(matrizE.value);
    eps = math.evaluate(tolerancia.value);
    if (A == null) {
        passosE.innerHTML = "Entrada Inválida!";
        return;
    }
    resultado = Metodo.jacobi(A, eps);
    fillTable(tblResultado, resultado.Lamb, resultado.P);
    resultadoMaisE.innerHTML = "";
    resultado.matrices.forEach((matrix, i) => {
        let table = document.createElement('table');
        fillTable(table, ["Matriz " + (i + 1)], matrix);
        resultadoMaisE.appendChild(table);
    });
    passosE.innerHTML = "";
    saida.setAttribute("style", "display: block;");
    btnMostrarMais.setAttribute("style", "display: inline;");
});
// Exemplos de Entrada
btnEx1.addEventListener('click', ()=>{
    matrizE.value = 
`5, 2, 1
2, 3, 1
1, 1, 2`;
    AutoResize(matrizE);
});
btnEx2.addEventListener('click', ()=>{
    matrizE.value = 
`40, 8, 4, 2, 1
8, 30, 12, 6, 2
4, 12, 20, 1, 2
2, 6, 1, 25, 4
1, 2, 2, 4, 5`;
    AutoResize(matrizE);
});
btnMostrarMais.addEventListener('click', ()=>{
    let isVisible = (saidaMaisE.style.display === "block");
    saidaMaisE.setAttribute("style", isVisible ? "display: none;" : "display: block;");
    btnMostrarMais.innerHTML = (isVisible) ? "Mostrar mais" : "Mostrar menos";
});

// Auto-resize
const tx = document.getElementsByTagName("textarea");
for (let i = 0; i < tx.length; i++) {
  tx[i].setAttribute("style", "height:" + (tx[i].scrollHeight) + "px;overflow-y:hidden;");
  tx[i].addEventListener("input", OnInput, false);
}

function OnInput() {
    AutoResize(this);
}
function AutoResize(textarea) {
    textarea.style.height = "auto";
    textarea.style.height = (textarea.scrollHeight) + "px";
}
function fillTable(tbl, header, cells) {
    tbl.innerHTML = "";
    if (header.length) {
        let thead = tbl.createTHead(), tr, td;
        tr = thead.insertRow(0);
        for (let i = 0; i < header.length; ++i){
            td = tr.insertCell();
            if (header.length === 1) td.colSpan = cells.length.toString();
            td.appendChild(document.createTextNode(`${header[i]}`));
        }
    }
    let tbody = tbl.createTBody();
    for (let i = 0; i < cells.length; ++i){
        tr = tbody.insertRow();
        for (let j = 0; j < cells.length; ++j){
            td = tr.insertCell();
            td.appendChild(document.createTextNode(`${cells[i][j]}`));
        }     
    }
}
window.onload = Theme.load;
