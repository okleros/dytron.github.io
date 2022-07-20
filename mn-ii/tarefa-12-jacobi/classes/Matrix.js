class Matrix extends Array {
    static fromArray(A) {
        let M = Matrix.create(A.length, 1);
        for (let i = 0; i < A.length; ++i)
            M[i][0] = A[i];
        return M;
    }
    /**
     * Cria uma matriz com m por n
     * @param {Number} m linhas
     * @param {Number} n colunas
     * @param {Number} value valor inicial
     * @returns {Matrix} matriz
     */
    static create(m, n, value = 0) {
        let M = new Matrix(m);
        for (let i = 0; i < m; ++i) {
            M[i] = new Array(n);
            for (let j = 0; j < n; ++j)
                M[i][j] = value;
        }
        M.rows = m;
        M.cols = n;
        return M;
    }
    /**
     * Retorna a matriz identidade n por n
     * @param {Number} n
     * @returns {Matrix} matriz identidade
     */
    static identity(n) {
        let M = Matrix.create(n, n);
        for (let i = 0; i < n; ++i)
            M[i][i] = 1;
        return M;
    }
    /**
     * Retorna a multiplicação desta matriz por B
     * @param {Matrix} B
     * @returns {Matrix} Matriz resultante
     */
    multiply(B) {
        let A = this;
        let M = Matrix.create(A.rows, B.cols);
        for (var i = 0; i < A.rows; i++) {
            for (var j = 0; j < B.cols; j++) {
                let sum = 0;
                for (var k = 0; k < A.cols; k++)
                    sum += A[i][k] * B[k][j];
                M[i][j] = sum;
            }
        }
        return M;
    }
    /**
     * @returns {Matrix} Matriz normalizada
     */
    normalize() {
        let M = Matrix.create(this.rows, this.cols);
        let norma = 0;
        let i, j;
        for (i = 0; i < this.rows; ++i)
            for (j = 0; j < this.cols; ++j)
                norma += this[i][j] ** 2;
        norma **= 0.5;
        for (i = 0; i < this.rows; ++i)
            for (j = 0; j < this.cols; ++j)
                M[i][j] = this[i][j] / norma;
        return M;
    }
    /**
     * @returns {Matrix} Matriz transposta
     */
    transpose() {
        let m = this.cols, n = this.rows, i, j;
        let M = Matrix.create(m, n);
        for (i = 0; i < m; ++i)
            for (j = 0; j < n; ++j)
                M[i][j] = this[j][i];
        return M;
    }
    /**
     * @returns {Matrix} Matriz cópia
     */
    copy() {
        let m = this.cols, n = this.rows, i, j;
        let M = Matrix.create(m, n);
        for (i = 0; i < m; ++i)
            for (j = 0; j < n; ++j)
                M[i][j] = this[i][j];
        return M;
    }
    /**
     * @returns {Array} Diagonal
     */
    diagonal() {
        let n = this.rows, i;
        let v = new Array(n);
        for (i = 0; i < n; ++i)
            v[i] = this[i][i];
        return v;
    }
    /**
     * @returns {Array} Termos abaixo da Diagonal
     */
    belowDiagonal() {
        let n = this.rows, i, j;
        let v = [];
        for (i = 0; i < n; ++i)
            for (j = 0; j < i; ++j)
                v.push(this[i][j]);
        return v;
    }
}