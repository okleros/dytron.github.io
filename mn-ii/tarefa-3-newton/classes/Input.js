class Input {
    static getExpressionString(func) {
        return func
            .toLowerCase()
            .replaceAll("º", " deg")
            .replaceAll("°", " deg")
            .replaceAll(",", ".")
            .replaceAll("sen", "sin")
            .replaceAll("pi", "3.1415926535");
    }
}