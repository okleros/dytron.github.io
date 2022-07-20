var gauss = require("./gauss");

// Funcao que calculao valor exato para fins de comparacao
function fSolved(x) {
  return (1 / (Math.E ** -1 - Math.E)) * (Math.E ** -x - Math.E ** x);
}

// Especifique o numero de partes
const N = 16;

const deltaX = 1 / N;

const celEsq = 1 / (deltaX * deltaX);

const celDir = 1 / (deltaX * deltaX);

const celCent = -(2 / (deltaX * deltaX) + 1);

const conditionLeft = 0;

const conditionRight = 1;

//Inicializando estruturas de dados:

const zeros = (m, n) => [...Array(m)].map((e) => Array(n).fill(0));

let coefMatrix = zeros(N - 1, N - 1);
let vectorConsts = new Array(N - 1).fill(0);
let resExato = new Array(N - 1).fill(0);

//Preenchendo resultados exatos:
for (let i = 0; i < N - 1; i++) {
  resExato[i] = fSolved(deltaX * (i + 1));
}

// Gerando a matrix de coeficientes pelo método das diferenças finitas
for (let i = 0; i < N - 1; i++) {
  if (i == 0) {
    vectorConsts[i] -= conditionLeft * celEsq;
    coefMatrix[i][i + 1] = celDir;
    coefMatrix[i][i] = celCent;
  } else if (i == N - 2) {
    vectorConsts[i] -= conditionRight * celDir;
    coefMatrix[i][i - 1] = celEsq;
    coefMatrix[i][i] = celCent;
  } else {
    coefMatrix[i][i - 1] = celEsq;
    coefMatrix[i][i] = celCent;
    coefMatrix[i][i + 1] = celDir;
  }
}

// Usando a biblioteca tercerizada apenas para a resolucao do sistema de equacoes
let result = gauss(coefMatrix, vectorConsts);

//Funcao que cria o objeto row para a saida:
function Row(approx, exact) {
  this.ValorAproximado = approx;
  this.ValorExato = exact;
  this.ErroRelativo = Math.abs(exact - approx) / exact;
}

// Preencendo a lista de rows:
let rowList = [];
for (let i = 0; i < N - 1; i++) {
  rowList.push(new Row(result[i], resExato[i]));
}

// Logando saida em formato de tabela:
console.table(rowList);
