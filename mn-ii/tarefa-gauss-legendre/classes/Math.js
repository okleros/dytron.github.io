Math.getExpressionString = function(func) {
    return func
        .toLowerCase()
        .replaceAll("º", " deg")
        .replaceAll("°", " deg")
        .replaceAll(",", ".")
        .replaceAll("sen", "sin")
        .replaceAll("pi", "3.1415926535");
}
Math.getExpressionValue = function(expression, x) {
    return eval(expression.replaceAll("X", x));
}
function x_s(ini, fim, s) {
    return (ini + fim + s*(fim - ini)) / 2;
}
Math.getExpressionValue = function(expression, x) {
    return eval(expression.replaceAll("X", x));
}
Math.GaussLegendre = function(f, ini, fim, n) {
    let expression = 0;
    for (let i = 0; i < n; ++i) {
        expression += f(x_s(ini, fim, legendre.r[n][i])) * legendre.w[n][i];
    }
    return (fim - ini) * expression / 2;
}