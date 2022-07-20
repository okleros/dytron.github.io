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
    resultado.innerHTML = "Resultado: " + integral.valor.toString() + '<br>Número de Partições: ' + integral.N.toString();
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
            let a, b, pontos, eps;
            a = math.evaluate(Input.getExpressionString(intIni.value));
            b = math.evaluate(Input.getExpressionString(intFim.value));
            pontos = parseInt(intPontos.value);
            fString = Input.getExpressionString(funcao.value);
            fCompiled = math.compile(fString);
            eps = math.evaluate(tolerancia.value);
            mostrarResultado(Integral.calculate(GaussLegendre, a, b, eps, pontos));
        } catch (e) {
            resultado.innerHTML = "Erro!";
            console.log(e);
        } finally {
            executar.innerHTML = "Executar";
        }
    }, 1);
});
Theme.init();