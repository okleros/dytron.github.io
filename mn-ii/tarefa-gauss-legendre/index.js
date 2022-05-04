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
var fString = "Math.cos(x)";
function f(x) {
    return Math.getExpressionValue(fString, x);
}
// x em função de s
function x_s(ini, fim, s) {
    return (ini + fim + s*(fim - ini)) / 2;
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
            integralNova += Math.GaussLegendre(f, x_s, xi, xf, pontos)
        }
        N *= 2;
    } while (Math.abs((integralNova - integralVelha) / integralNova) > eps);
    return {valor: integralNova, N};
}
executar.addEventListener('click', ()=>{
    let a, b, pontos, eps;
    a = parseFloat(intIni.value);
    b = parseFloat(intFim.value);
    pontos = parseInt(intPontos.value);
    fString = Math.getExpressionString(funcao.value);
    eps = parseFloat(tolerancia.value);
    mostrarResultado(integralLegendre(a, b, pontos, eps));
});