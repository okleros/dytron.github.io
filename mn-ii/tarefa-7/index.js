// Elementos
var intIni = document.getElementById("int-ini");
var intFim = document.getElementById("int-fim");
var corte = document.getElementById("corteIni");
var intPontos = document.getElementById("int-pontos");
var funcao = document.getElementsByName("funct");
var exp = document.getElementsByName("exp");
var toleranciaExt = document.getElementById("toleranciaExt");
var tolerancia = document.getElementById("toleranciaInt");
var executar = document.getElementById("executar");
var resultado = document.getElementById("resultado");
for (let i = 0; i < legendre.w.length; ++i) {
  if (legendre.w[i].length)
    intPontos.innerHTML += `<option value="${i}">${i}</option>`;
}
function mostrarResultado(integral) {
  resultado.innerHTML =
    "Resultado: " +
    integral.valor.toString() +
    "<br>Valor de corte usado: " +
    integral.N.toString();
}
// Função f de x
function f1(x) {
  return 1 / math.cbrt(x ** 2);
}

function f2(x) {
  return 1 / math.sqrt(4 - x ** 2);
}

function fSimples(x, a, b, f) {
  let xs = (a + b) / 2 + ((b - a) / 2) * math.tanh(x);
  let dxsds = ((b - a) / 2) * math.sech(x) ** 2;
  return f(xs) * dxsds;
}
function fDupla(x, a, b, f) {
  let xs =
    (a + b) / 2 + ((b - a) / 2) * math.tanh((math.PI / 2) * math.sinh(x));
  let dxsds =
    ((b - a) / 2) *
    (Math.PI / 2) *
    math.cosh(x) *
    math.sech((math.PI / 2) * math.sinh(x)) ** 2;
  return f(xs) * dxsds;
}
// Função que calcula a integral
function integralLegendre(
  corteIni,
  pontos,
  eps,
  epsExterno,
  a,
  b,
  funChosen,
  tipoExp
) {
  let f, fExp;

  if (funChosen === 1) f = f1;
  else f = f2;
  if (tipoExp === 1) fExp = fSimples;
  else fExp = fDupla;
  let integralNova = Number.POSITIVE_INFINITY,
    integralVelha;

  let resultadoNovo = Number.POSITIVE_INFINITY,
    resultadoVelho;

  let N, dx;
  let xi, xf;
  let passo = 0.1;
  let c = corteIni;
  let ciclar = true;
  // Loop externo do corte
  do {
    N = 1;
    resultadoVelho = resultadoNovo;
    integralNova = Number.POSITIVE_INFINITY;
    ciclar = false;

    // loop interno do calculo da "area gorda do dinossauro"
    do {
      integralVelha = integralNova;
      dx = (c - -c) / N;
      integralNova = 0;
      for (let i = 0; i < N; ++i) {
        xi = -c + i * dx;
        xf = xi + dx;
        integralNova += Math.GaussLegendre(fExp, f, xi, xf, pontos, a, b);
      }
      N *= 2;
      console.log(integralNova, N, c, passo);
    } while (math.abs((integralNova - integralVelha) / integralNova) > eps);

    resultadoNovo = integralNova;
    c += passo;
    if (passo < 0.00000000000001) {
      corteIni -= 0.1;
    }
    if (!Number.isFinite(resultadoNovo)) {
      c = corteIni;
      passo /= 10;
      //console.log(passo);
      resultadoNovo = Number.POSITIVE_INFINITY;
      //console.log("OPAAA");
      //console.log(
      //  Math.abs((resultadoNovo - resultadoVelho) / resultadoNovo) > epsExterno
      // );

      ciclar = true;
    }
  } while (
    math.abs((resultadoNovo - resultadoVelho) / resultadoNovo) > epsExterno ||
    ciclar
  );

  return { valor: resultadoNovo, N: c };
}
executar.addEventListener("click", () => {
  let a, b, pontos, eps, corteIni, funChosen, tipoExp;
  a = parseFloat(intIni.value);
  b = parseFloat(intFim.value);
  corteIni = parseFloat(corte.value);
  pontos = parseInt(intPontos.value);

  if (funcao[0].checked) funChosen = 1;
  else funChosen = 2;

  if (exp[0].checked) tipoExp = 1;
  else tipoExp = 2;

  eps = parseFloat(tolerancia.value);
  epsExterno = parseFloat(toleranciaExt.value);
  resultado.innerHTML = "Calculando...";
  setTimeout(()=>{
    mostrarResultado(
      integralLegendre(
        corteIni,
        pontos,
        eps,
        epsExterno,
        a,
        b,
        funChosen,
        tipoExp
      )
    )}, 10);
});
