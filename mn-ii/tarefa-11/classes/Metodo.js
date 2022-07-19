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
     * @param {Matrix} M matriz do problema
     * @param {Matrix} x matriz coluna
     * @param {Number} eps tolerância 
     * @returns {Object} (eigenvalue: Number, eigenvector: Array)
     */
    static potenciaInversa(M, x, eps) {
        let lu = LU.decomposition(M);
        let L = lu.L, U = lu.U;
        let eigenvalueOld = 0, eigenvalue, eigenvector;
        let y, passos = 0, error = Number.POSITIVE_INFINITY;
        
        x = x.normalize();
        y = LU.resolution(L, U, x);
        eigenvalue = x.transpose().multiply(y)[0][0];

        while (error > eps) {
            eigenvalueOld = eigenvalue;
            x = y.normalize();
            y = LU.resolution(L, U, x);
            eigenvalue = x.transpose().multiply(y)[0][0];
            error = Math.abs((eigenvalueOld - eigenvalue) / eigenvalue);
            passos++;
        }
        eigenvalue = 1 / x.transpose().multiply(y)[0][0];
        eigenvector = y.normalize().transpose()[0];
        return {
            eigenvalue,
            eigenvector,
            passos
        };
    }
}