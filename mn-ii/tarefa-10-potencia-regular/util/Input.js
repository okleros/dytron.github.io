class Input {
    /**
     * @description Retorna a string de entrada separada como vetor
     * @param {string} str 
     * @returns {Array} vetor de string
     */
    static toArray(str) {
        return str.replace(/ /g, '').replace(/\n/g, ',').split(",").filter(x => x.length !== 0)
    }
    /**
     * @description Retorna a string de entrada como matriz de números
     * @param {str} str 
     * @returns {Array<Array>} matriz de números
     */
    static stringToMatrix(str) {
        let array = Input.toArray(str);
        let N = Math.floor(array.length ** 0.5);
        // Invalid Matrix
        if (N*N !== array.length) return null;
        let matrix = new Array(N), k = 0;
        try {
            for (let i = 0; i < N; ++i) {
                matrix[i] = new Array(N);
                for (let j = 0; j < N; ++j)
                    matrix[i][j] = math.evaluate(array[k++]);
            }
            return matrix;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    /**
     * @description Retorna a string de entrada como vetor de números
     * @param {string} str 
     * @returns vetor de números
     */
    static stringToArray(str) {
        try {
            let array = Input.toArray(str);
            let N = array.length;
            for (let i = 0; i < N; ++i) 
                array[i] = math.evaluate(array[i]);
            return array;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}