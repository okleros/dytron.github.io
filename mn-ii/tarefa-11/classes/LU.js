class LU {
    /**
     * @param {Matrix} L matriz triangular inferior com diagonal principal unitária
     * @param {Matrix} U matriz triangular superior
     */
    constructor(L, U) {
        this.L = L;
        this.U = U;
    }
    /**
     * Decomposição da matriz M em LU
     * @param {Matrix} M
     * @returns {LU} Matriz L e U
     */
    static decomposition(M) {
        let n = M.length;
        let L = Matrix.identity(n);
        let U = Matrix.identity(n);
        let i, j, k, value;
        for (j = 0; j < n; ++j) {
            for (i = 0; i < j + 1; ++i) {
                value = 0;
                for (k = 0; k < i; ++k)
                    value += L[i][k] * U[k][j];
                U[i][j] = M[i][j] - value;
            }
            for (i = j + 1; i < n; ++i) {
                value = 0;
                for (k = 0; k < j; ++k)
                    value += L[i][k] * U[k][j];
                if (U[j][j] === 0)
                    return null;
                L[i][j] = (M[i][j] - value) / U[j][j];
            }
        }
        return new LU(L, U);
    }
    /**
     * Resolve LUx = b, retornando x
     * @param {Matrix} L matriz triangular inferior com diagonal principal unitária
     * @param {Matrix} U matriz triangular superior
     * @param {Matrix} b matriz coluna dos termos independentes
     * @returns {Matrix} x
     */
    static resolution(L, U, b) {
        let m = b.rows, i, j;
        let x = Matrix.create(m, 1);
        let y = Matrix.create(m, 1);
        // Resolvemos Ly = b
        for (i = 0; i < m; ++i) {
            y[i][0] = b[i][0];
            for (j = 0; j < i; ++j)
                y[i][0] -= L[i][j] * y[j][0];
        }
        // Resolvemos Ux = y
        for (i = m - 1; i >= 0; --i) {
            x[i][0] = y[i][0];
            for (j = m - 1; j > i; --j)
                x[i][0] -= U[i][j] * x[j][0];
            x[i][0] /= U[i][i];
        }
        return x;
    }
}