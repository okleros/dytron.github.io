// Elementos
var intIni = document.getElementById("int-ini");
var intFim = document.getElementById("int-fim");
var intPontos = document.getElementById("int-pontos");
var funcao = document.getElementById("funcao");
var tolerancia = document.getElementById("tolerancia");
var executar = document.getElementById("executar");
var resultado = document.getElementById("resultado");
for (let i = 0; i < legendre.w.length; ++i) {
    if (legendre.w[i].length)
        intPontos.innerHTML += `<option value="${i}">${i}</option>`    
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
function integralLegendre(a, b, pontos, eps)  {
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
            integralNova += Math.GaussLegendre(f, xi, xf, pontos)
        }
        N *= 2;
    } while (Math.abs((integralNova - integralVelha) / integralNova) > eps);
    return {valor: integralNova, N: N-1};
}
executar.addEventListener('click', ()=>{
    let a, b, pontos, eps;
    a = math.evaluate(Math.getExpressionString(intIni.value));
    b = math.evaluate(Math.getExpressionString(intFim.value));
    pontos = parseInt(intPontos.value);
    fString = Math.getExpressionString(funcao.value);
    fCompiled = math.compile(fString);
    eps = parseFloat(tolerancia.value);
    mostrarResultado(integralLegendre(a, b, pontos, eps));
});