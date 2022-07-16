// Elementos
var matrizE = document.getElementById("matriz");
var toleranciaE = document.getElementById("tolerancia");
var executarE = document.getElementById("executar");
var ex1 = document.getElementById("ex1");
var ex2 = document.getElementById("ex2");
var resultadoE = document.getElementById("resultado");
var saida = document.getElementById("saida");
var passosE = document.getElementById("passos");

executarE.addEventListener('click', ()=>{
    let A, eps, resultado, tr, td;
    A = Input.stringToMatrix(matrizE.value);
    eps = math.evaluate(tolerancia.value);
    if (A == null) {
        passosE.innerHTML = "Entrada Inválida!";
        return;
    }
    resultado = Metodo.jacobi(A, eps);
    resultadoE.innerHTML = "";
    let thead = resultadoE.createTHead();
    tr = thead.insertRow(0);
    for (let i = 0; i < resultado.Lamb.length; ++i){
        td = tr.insertCell();
        td.appendChild(document.createTextNode(`${resultado.Lamb[i]}`));
    }
    let tbody = resultadoE.createTBody();
    for (let i = 0; i < resultado.P.length; ++i){
        tr = tbody.insertRow();
        for (let j = 0; j < resultado.P.length; ++j){
            td = tr.insertCell();
            td.appendChild(document.createTextNode(`${resultado.P[i][j]}`));
        }     
    }
    /*resultadoE.value = resultado.eigenvalue;
    resultado2E.value = resultado.eigenvector.join("\n");
    resultado2E.rows = resultado.eigenvector.length;
    passosE.innerHTML = "Número de passos: " + resultado.passos.toString();
    AutoResize(resultado2E);*/
    saida.setAttribute("style", "display: block;");
});
// Exemplos de Entrada
ex1.addEventListener('click', ()=>{
    matrizE.value = 
`5, 2, 1
2, 3, 1
1, 1, 2`;
    AutoResize(matrizE);
});
ex2.addEventListener('click', ()=>{
    matrizE.value = 
`40, 8, 4, 2, 1
8, 30, 12, 6, 2
4, 12, 20, 1, 2
2, 6, 1, 25, 4
1, 2, 2, 4, 5`;
    AutoResize(matrizE);
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