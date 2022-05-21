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
Math.IntegralQuadratura = function(f, n, tipo) {
    let expression = 0;
    let formula = quadraturas[tipo][n];
    for (let i = 0; i < n; ++i) {
        expression += f(formula.r[i]) * formula.w[i];
    }
    return expression;
}