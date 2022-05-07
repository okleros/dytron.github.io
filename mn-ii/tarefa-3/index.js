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
    resultado.innerHTML = "Resultado: " + integral.valor.toString() + '<br>N: ' + integral.N.toString();
}
// Função f de x
var fString, fCompiled; 
function f(x) {
    return fCompiled.evaluate({x});
}
// Função que calcula a integral
function integralNewton(a, b, pontos, eps, tipo)  {
    let integralNova = Number.POSITIVE_INFINITY, integralVelha;
    let N = 1, dx;
    let xi, xf;
    do {
        integralVelha = integralNova;
        dx = (b - a) / N;
        integralNova = 0;
        for (let i = 0; i < N; ++i) {
            xi = a + i * dx;
            xf = xi + dx;
            integralNova += Math.NewtonCotes(f, xi, xf, pontos, tipo)
        }
        N *= 2;
    } while (Math.abs((integralNova - integralVelha) / integralNova) > eps);
    return {valor: integralNova, N};
}
executar.addEventListener('click', ()=>{
    let a, b, pontos, eps, tipo;
    a = math.evaluate(Math.getExpressionString(intIni.value));
    b = math.evaluate(Math.getExpressionString(intFim.value));
    pontos = parseInt(intGrau.value);
    tipo = parseInt(intTipo.value);
    fString = Math.getExpressionString(funcao.value);
    eps = parseFloat(tolerancia.value);
    fCompiled = math.compile(fString);
    mostrarResultado(integralNewton(a, b, pontos, eps, tipo));
});
intTipo.addEventListener('change', ()=>{
    atualizarPontos();
});
atualizarPontos();