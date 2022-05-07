/* Com eval()
Math.getExpressionString = function(func) {
    return func
        .toLowerCase()
        .replaceAll("º", "*(Math.PI/180)")
        .replaceAll("°", "*(Math.PI/180)")
        .replaceAll(",", ".")
        .replaceAll("-", "-1*")
        .replaceAll("x", "(X)")
        .replaceAll("cos", "1*Math.cos")
        .replaceAll("sin", "1*Math.sin")
        .replaceAll("sen", "1*Math.sin")
        .replaceAll("sqrt", "1*Math.sqrt")
        .replaceAll("pi", "1*(Math.PI)")
        .replaceAll("^", "**")
        .replaceAll("e", "1*(Math.E)");
}*/
Math.getExpressionString = function(func) {
    return func
        .toLowerCase()
        .replaceAll("º", " deg")
        .replaceAll("°", " deg")
        .replaceAll(",", ".")
        .replaceAll("sen", "sin");
}
Math.getExpressionValue = function(expression, x) {
    return eval(expression.replaceAll("X", x));
}
function x_s(ini, fim, s) {
    return (ini + fim + s*(fim - ini)) / 2;
}
Math.NewtonCotes = function(f, ini, fim, n, tipo) {
    let expression = 0;
    let formula = (tipo ? aberta[n] : fechada[n]);
    if (tipo === 0) {
        for (let i = 0; i <= n; ++i) {
            expression += f(x_s(ini, fim, i/n)) * formula[1][i];
        }
    } else {
        for (let i = 1; i < n + 2; ++i) {
            expression += f(x_s(ini, fim, i/(n + 2))) * formula[1][i-1];
        }
    }
    return (fim - ini) * formula[0] * expression / (n + 2*tipo);
}