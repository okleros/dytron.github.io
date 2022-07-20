class Metodo {
  constructor() {}
  /**
   * @param {Matrix} v1
   * @param {Matrix} v2
   * @returns {Number} Produto Escalar dos 2 vetores
   */
  static dotProduct(v1, v2) {
    return v1.multiply(v2)[0][0];
  }
  /**
   * Retorna a matriz tridiagonal e a matriz de householder acumulada
   * @param {Matrix} A matriz do problema
   * @returns {Object} (Anew: Matrix, Hacc: Matrix)
   */
  static householder(A) {
    let Hacc, Aold, Hi, Anew;
    // Tamanho de A
    let n = A.rows;

    Hacc = Matrix.identity(n);
    Aold = A;

    for (let i = 0; i < n - 2; i++) {
      // Construção da Matriz de Householder do passo i
      Hi = Metodo.MatrizHouseholderBaseadaNaCol_iDaMatrizDoPassoAnterior(Aold, i);
      
      // Transformação de similaridade do passo i
      Anew = Hi.multiply(Aold.multiply(Hi));

      // Salvar para o proximo passo
      Aold = Anew;

      // Acumular o produto das matrizes de Householder
      Hacc = Hacc.multiply(Hi);
    }

    return { Anew, Hacc };
  }

  /**
   * @param {Matrix} A matriz
   * @param {Number} i coluna
   * @returns {Matrix} matriz de householder
   */
  static MatrizHouseholderBaseadaNaCol_iDaMatrizDoPassoAnterior(A, i) {
    let n = A.rows;
    let I = Matrix.identity(n);
    let w, w_, N, e, H;

    // Inicializando vetores
    w = Matrix.create(n, 1, 0);
    w_ = Matrix.create(n, 1, 0);
    e = Matrix.create(n, 1, 0);
    N = Matrix.create(n, 1, 0);
    H = Matrix.create(n, n, 0);

    // Copiar os elementos abaixo da diagonal da coluna i da matriz A para as respectivas posicoes no vetor w
    // ou seja, da posicao i+1 ate o final.
    for (let j = i + 1; j < n; j++)
      w[j][0] = A[j][i];

    let Lw = w.norma();
    w_[i + 1][0] = Lw;

    // Calcular o vetor N (fazendo w - w_);
    let exp;
    if (w[i + 1][0] >= 0)
      exp = 2;
    else
      exp = 1;

    for (let j = 0; j < w.rows; j++) 
      N[j][0] = w[j][0] + (-1) ** exp * w_[j][0];

    N = N.normalize();
    let NNt = N.multiply(N.transpose()).multiply(2);

    // Montar a matriz de Householder
    for (let i = 0; i < n; ++i)
      for (let j = 0; j < n; ++j)
        H[i][j] = I[i][j] - NNt[i][j];

    return H;
  }
}
