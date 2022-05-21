// Elementos
var intPontos = document.getElementById("int-pontos");
var intTipo = document.getElementById("int-tipo");
var funcao = document.getElementById("funcao");
var tolerancia = document.getElementById("tolerancia");
var executar = document.getElementById("executar");
var resultado = document.getElementById("resultado");
var imagem = document.getElementById("img-formula")
function atualizarPontos() {
    let formulas = quadraturas[parseInt(intTipo.value)];
    intPontos.innerHTML = "";
    for (let i = 0; i < formulas.length; ++i) {
        if (formulas[i] != undefined)
            intPontos.innerHTML += `<option value="${i}">${i}</option>`    
    }
    imagem.src = `img/${intTipo.value}.svg`;
}
function mostrarResultado(integral) {
    resultado.innerHTML = "Resultado: " + integral.toString();
}
// Função f de x
var fString, fCompiled; 
function f(x) {
    return fCompiled.evaluate({x});
}
executar.addEventListener('click', ()=>{
    let pontos, tipo;
    pontos = parseInt(intPontos.value);
    tipo = parseInt(intTipo.value);
    fString = Math.getExpressionString(funcao.value);
    fCompiled = math.compile(fString);
    mostrarResultado(Math.IntegralQuadratura(f, pontos, tipo));
});
intTipo.addEventListener('change', ()=>{
    atualizarPontos();
});
atualizarPontos();