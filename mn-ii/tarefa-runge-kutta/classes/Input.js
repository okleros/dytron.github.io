class Input {
    /**
     * Retorna a string de entrada separada como vetor
     * @param {string} str 
     * @returns {Array} vetor de string
     */
    static toArray(str) {
        return str.replace(/ /g, '').replace(/\n/g, ',').split(",").filter(x => x.length !== 0)
    }
    /**
     * Retorna a string de entrada como vetor de números
     * @param {string} str 
     * @returns vetor de números
     */
    static stringToArray(str) {
        try {
            let array = Input.toArray(str);
            let n = array.length;
            for (let i = 0; i < n; ++i) 
                array[i] = math.evaluate(array[i]);
            return array;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}