class Metodo {
    constructor() {

    }
    /**
     * @param {Matrix} v1
     * @param {Matrix} v2
     * @returns {Number} Produto Escalar dos 2 vetores
     */
    static dotProduct(v1, v2) {
        return v1.multiply(v2)[0][0];
    }
    /**
     * Retorna o **Autovalor dominante** e o **Autovetor correspondente**
     * @param {Matrix} A matriz do problema
     * @param {Number} eps tolerância 
     * @returns {Object} (P: Matrix, Lamb: Array)
     */
    static jacobi(A, eps) {
        let P, J, Anew, Aold;
        // Tamanho de A
        let n = A.rows;
        // Vetor que armazena os autovalores de A
        let Lamb = new Array(n);
        // Soma dos quadrados dos elementos
        let val = 100;
        // Matriz que contém os produtos das matrizes ortogonais J
        // para recuperar os autovetores da matriz original
        P = Matrix.identity(n);
        Aold = A.copy();
        // Varreduras de diagonalização
        while (val > eps) {
            ({Anew, J} = Metodo.varreduraDeJacobi(Aold));
            Aold = Anew.copy();
            P = P.multiply(J);
            val = Anew.belowDiagonal().reduce((sum, x) => sum + x**2, 0);
            console.log(val);
        }
        Lamb = Anew.diagonal();
        return {
            P,
            Lamb
        };
    }
    /**
     * @param {Matrix} A matriz
     * @returns {Object} (Anew: Matrix, J: Matrix)
     */
    static varreduraDeJacobi(A) {
        let J, Jij, Anew, Aold;
        let n = A.rows;
        // Matriz que contém os produtos das matrizes ortogonais Jij
        // para recuperar os autovetores da matriz original
        J = Matrix.identity(n);
        Aold = A.copy();
        for (let j = 0; j < n - 1; ++j) {
            for (let i = j + 1; i < n; ++i) {
                // Construção da matriz de Jacobi Jij
                Jij = Metodo.matrizJacobiBaseadaNoElemento_ij_DaMatrizVelha(Aold, i, j);
                // Transformação de similaridade do passo ij
                // Produto de três matrizes
                // Como Jij não é simétrica, sua transposta Jij precisa ser computada
                Anew = Jij.transpose().multiply(Aold).multiply(Jij);
                // Salvar para o próximo passo
                Aold = Anew.copy();
                // Acumular produto das matrizes de Jacobi
                J = J.multiply(Jij);
            }
        }
        return {
            Anew,
            J
        };
    }
    /**
     * @param {Matrix} A matriz
     * @param {Number} i linha 
     * @param {Number} j coluna
     * @returns {Matrix} matriz
     */
    static matrizJacobiBaseadaNoElemento_ij_DaMatrizVelha(A, i, j) {
        let n = A.rows, angle, eps = 1e-6;
        let Jij = Matrix.identity(n);
        // Aij ~= 0
        if (Math.abs(A[i][j]) <= eps) return Jij;
        // Aii ~= Ajj
        if (Math.abs((A[i][i] - A[j][j])) <= eps) {
            angle = Math.PI / 4; 
        } else {
            angle = 0.5 * Math.atan(-2*(A[i][j]) / (A[i][i] - A[j][j])); 
        }
        Jij[i][i] = Jij[j][j] = Math.cos(angle);
        Jij[i][j] = Math.sin(angle);
        Jij[j][i] = -Jij[i][j];
        return Jij;
    }
}