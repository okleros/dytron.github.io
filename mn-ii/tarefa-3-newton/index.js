// Elementos
var intIni = document.getElementById("int-ini");
var intFim = document.getElementById("int-fim");
var intGrau = document.getElementById("int-grau");
var intTipo = document.getElementById("int-tipo");
var funcao = document.getElementById("funcao");
var tolerancia = document.getElementById("tolerancia");
var executar = document.getElementById("executar");
var resultado = document.getElementById("resultado");

function atualizarPontos() {
    let formulas = fechada;
    if (parseInt(intTipo.value) === 1) formulas = aberta;
    intGrau.innerHTML = "";
    for (let i = 0; i < formulas.length; ++i) {
        if (formulas[i].length != 0)
            intGrau.innerHTML += `<option value="${i}">${i}</option>`    
    }
}
function mostrarResultado(integral) {
    resultado.innerHTML = "Resultado: " + integral.valor.toString() + '<br>Número de partições: ' + integral.N.toString();
}
// Função f de x
var fString, fCompiled; 
function f(x) {
    return fCompiled.evaluate({x});
}
executar.addEventListener('click', () => {
    executar.innerHTML = "Executando...";
    setTimeout(()=> {
        try {
            let a, b, pontos, eps, tipo;
            a = math.evaluate(Input.getExpressionString(intIni.value));
            b = math.evaluate(Input.getExpressionString(intFim.value));
            pontos = parseInt(intGrau.value);
            tipo = parseInt(intTipo.value);
            fString = Input.getExpressionString(funcao.value);
            eps = math.evaluate(tolerancia.value);
            fCompiled = math.compile(fString);
            mostrarResultado(Integral.calculate(
                (tipo === 1) ? NewtonCotesAberta : NewtonCotesFechada,
                a, b, pontos, eps));
        } catch (e) {
            resultado.innerHTML = "Erro!";
            console.log(e);
        } finally {
            executar.innerHTML = "Executar";
        }
    }, 1);
});
intTipo.addEventListener('change', ()=>{
    atualizarPontos();
});
atualizarPontos();
Theme.init();