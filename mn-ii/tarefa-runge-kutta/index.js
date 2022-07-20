// Elementos
var inputV0 = document.getElementById("input-v0");
var inputY0 = document.getElementById("input-y0");
var inputK = document.getElementById("input-k");
var inputM = document.getElementById("input-m");
var inputG = document.getElementById("input-g");
var inputTF = document.getElementById("input-tf");
var inputDT = document.getElementById("input-dt");
var executar = document.getElementById("executar");
var tblResultado = document.getElementById("resultado");
var saidaE = document.getElementById("saida");

executar.addEventListener('click', () => {
    executar.innerHTML = "Executando...";
    setTimeout(()=> {
        try {
            let v0, y0, K, M, G, DTs, TF;
            v0 = math.evaluate(inputV0.value);
            y0 = math.evaluate(inputY0.value);
            K = math.evaluate(inputK.value);
            M = math.evaluate(inputM.value);
            G = math.evaluate(inputG.value);
            TF = math.evaluate(inputTF.value);
            DTs = Input.stringToArray(inputDT.value);
            console.log(v0, y0, K, M, G, TF, DTs);
            let resultado = RangeKutta(v0, y0, K, M, G, TF, DTs);
            fillTable(tblResultado, [
                "ΔT",
                ["h", "máx"],
                ["t", "máx"],
                ["t", "total"],
                ["v", "impacto"],
            ], resultado);
            saidaE.setAttribute("style", "display: inline-block;");
        } catch (e) {
            resultado.innerHTML = "Erro!";
            console.log(e);
        } finally {
            executar.innerHTML = "Executar";
        }
    }, 1);
});
function fillTable(tbl, header, cells) {
    tbl.innerHTML = "";
    if (header.length) {
        let thead = tbl.createTHead(), tr, td;
        tr = thead.insertRow(0);
        for (let i = 0; i < header.length; ++i){
            td = tr.insertCell();
            if (header.length === 1) td.colSpan = cells.length.toString();
            if (Array.isArray(header[i])) {
                td.innerHTML = `${header[i][0]}<sub>${header[i][1]}</sub>`;
            } else {
                td.appendChild(document.createTextNode(`${header[i]}`));
            }
        }
    }
    let tbody = tbl.createTBody();
    for (let i = 0; i < cells.length; ++i){
        tr = tbody.insertRow();
        for (let j = 0; j < header.length; ++j){
            td = tr.insertCell();
            td.appendChild(document.createTextNode(`${cells[i][j]}`));
        }     
    }
}
Theme.init();