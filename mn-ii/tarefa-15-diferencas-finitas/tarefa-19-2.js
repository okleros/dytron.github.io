var gauss = require("./gauss");

// Especifique o numero de partes
const Nx = 8; //Em quantas partes dividir o eixo x
const Ny = 8; //Em quantas partes dividir o eixo y

const deltaX = 1 / Nx;
const deltaY = 1 / Ny;

const celEsq = 1 / (deltaX * deltaX);
const celDir = 1 / (deltaX * deltaX);

const celCima = 1 / (deltaY * deltaY);
const celBaixo = 1 / (deltaY * deltaY);

// Reutilizadas variaveis da celular pois possuem valor igual
const celCent = -2 * (celEsq + celCima);

// Criando vetor de constantes (b do Ax=b)
const FXY = 4;
let vectorConsts = new Array((Ny - 1) * (Nx - 1)).fill(FXY);

// Criando matriz de nós auxiliar:
const zeros = (m, n) => [...Array(m)].map((e) => Array(n).fill(0));
let auxMatrix = zeros(Ny - 1, Nx - 1);

// i percorre os nós horizontalmente
// j percorre os nós verticalmente
// Percorrendo e atribuindo numeros aos nós
count = 0;
for (let j = Ny - 2; j > -1; j--) {
  for (let i = 0; i < Nx - 1; i++) {
    auxMatrix[j][i] = count;
    count++;
  }
}

console.table(auxMatrix);

// Criando a matriz dos coeficientes:
let coefMatrix = zeros((Ny - 1) * (Nx - 1), (Ny - 1) * (Nx - 1));
let up, down, left, right;
// Agora vamos percorrer os nós e gerar a matriz dos coeficientes:
for (let j = Ny - 2; j > -1; j--) {
  for (let i = 0; i < Nx - 1; i++) {
    if (j - 1 != -1) {
      up = auxMatrix[j - 1][i];
      coefMatrix[auxMatrix[j][i]][up] = celCima;
    }
    if (i - 1 != -1) {
      left = auxMatrix[j][i - 1];
      coefMatrix[auxMatrix[j][i]][left] = celEsq;
    }
    if (j + 1 != Ny - 1) {
      down = auxMatrix[j + 1][i];
      coefMatrix[auxMatrix[j][i]][down] = celBaixo;
    }

    if (i + 1 != Nx - 1) {
      right = auxMatrix[j][i + 1];
      coefMatrix[auxMatrix[j][i]][right] = celDir;
    }

    center = auxMatrix[j][i];
    coefMatrix[auxMatrix[j][i]][center] = celCent;
  }
}
console.table(coefMatrix);
result = gauss(coefMatrix, vectorConsts);
console.table(result);

let res19 = [
  -0.171875, -0.21875, -0.171875, -0.21875, -0.28125, -0.21875, -0.171875,
  -0.21875, -0.171875,
];

//Funcao que cria o objeto row para a saida:
function Row(approx, exact) {
  this.Res19_PDF = approx;
  this.Res_N8 = exact;
  this.ErroRelativoAoRes_N8 = Math.abs(exact - approx) / exact;
}

// DESCOMENTE ESTA PARTE PARA A TABELA COMPARATIVA SOLICITADA NA TAREFA - ATENCAO!!! N DEVE ESTAR SETADO COMO 8!!!
// let rowList = [];
// rowList.push(new Row(res19[0], result[8]));
// rowList.push(new Row(res19[1], result[10]));
// rowList.push(new Row(res19[2], result[12]));
// rowList.push(new Row(res19[3], result[22]));
// rowList.push(new Row(res19[4], result[24]));
// rowList.push(new Row(res19[5], result[26]));
// rowList.push(new Row(res19[6], result[36]));
// rowList.push(new Row(res19[7], result[38]));
// rowList.push(new Row(res19[8], result[40]));

// console.table(rowList);
