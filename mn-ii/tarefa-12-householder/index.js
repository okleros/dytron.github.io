// Elementos
var matrizE = document.getElementById("matriz");
var executarE = document.getElementById("executar");
var ex1 = document.getElementById("ex1");
var ex2 = document.getElementById("ex2");
var saida = document.getElementById("saida");
var resultadoTri = document.getElementById("matriz-tri");
var resultadoAcu = document.getElementById("matriz-acu");

executarE.addEventListener("click", () => {
  let A, resultado;
  A = Input.stringToMatrix(matrizE.value);
  if (A == null) {
    passosE.innerHTML = "Entrada Inválida!";
    return;
  }
  resultado = Metodo.householder(A);
  resultadoTri.innerHTML = "";
  resultadoAcu.innerHTML = "";

  fillTable(resultadoTri, [], resultado.Anew);
  fillTable(resultadoAcu, [], resultado.Hacc);

  saida.setAttribute("style", "display: block;");
});
// Exemplos de Entrada
ex1.addEventListener("click", () => {
  matrizE.value = `5, 2, 1
2, 3, 1
1, 1, 2`;
  AutoResize(matrizE);
});
ex2.addEventListener("click", () => {
  matrizE.value = `40, 8, 4, 2, 1
8, 30, 12, 6, 2
4, 12, 20, 1, 2
2, 6, 1, 25, 4
1, 2, 2, 4, 5`;
  AutoResize(matrizE);
});

// Auto-resize
const tx = document.getElementsByTagName("textarea");
for (let i = 0; i < tx.length; i++) {
  tx[i].setAttribute(
    "style",
    "height:" + tx[i].scrollHeight + "px;overflow-y:hidden;"
  );
  tx[i].addEventListener("input", OnInput, false);
}

function OnInput() {
  AutoResize(this);
}
function AutoResize(textarea) {
  textarea.style.height = "auto";
  textarea.style.height = textarea.scrollHeight + "px";
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
Theme.init();