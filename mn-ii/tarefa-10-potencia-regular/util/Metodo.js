class Metodo {
    /**
     * @param {Array} v vetor
     * @returns {number} Comprimento do vetor
     */
    static norma(v) {
        let sum = 0;
        v.forEach(x => { sum += x*x; });
        return sum ** 0.5;
    }
    /**
     * @param {Array} v1
     * @param {Array} v2
     * @returns {number} Produto Escalar dos 2 vetores
     */
    static produtoEscalar(v1, v2) {
        let sum = 0;
        for (let i = 0; i < v1.length; ++i)
            sum += v1[i] * v2[i];
        return sum;
    }
    /**
     * @description Retorna o **Autovalor dominante** e o **Autovetor correspondente**
     * @param {Array<Array>} A matriz do problema
     * @param {Array} v0 vetor arbitrário
     * @param {number} eps tolerância 
     * @returns {Object} (autovalor: number, autovetor: Array)
     */
    static potenciaRegular(A, v0, eps) {
        let N = A.length, xVelho, it=0;
        // Step 2: Inicializar o autovalor
        let lambNovo = 0, lambVelho;
        // Step 3: Copiar o v0 para o vetor novo
        let vetorNovo = v0.concat();
        do {
            // Step 4: Copiar autovalor novo para autovalor velho
            lambVelho = lambNovo;
            // Step 5: Copiar vetorNovo para vetorVelho
            let vetorVelho = vetorNovo.concat();
            // Step 6: Normalizar vetorVelho
            let norma = Metodo.norma(vetorVelho);
            xVelho = vetorVelho.map(x => x / norma);
            // Step 7: Calcular o vetor não normalizado
            // vetorNovo recebe o produto da matriz A com o vetor normalizado
            for (let i = 0; i < N; ++i) {
                vetorNovo[i] = 0;
                for (let k = 0; k < N; ++k)
                    vetorNovo[i] += A[i][k] * xVelho[k];
            }
            // Step 8: Calcular a nova estimativa de lambdaNovo
            lambNovo = Metodo.produtoEscalar(xVelho, vetorNovo);
            it++;
        }
        // Step 9: Verificar a convergência de lambda
        while (Math.abs((lambNovo - lambVelho) / lambNovo) > eps);
        // Step 10: Retornar autovalor e autovetor
        return {
            autovalor: lambNovo,
            autovetor: xVelho,
            passos: it
        };
    }
}