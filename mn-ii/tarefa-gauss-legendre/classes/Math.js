Math.getExpressionString = function (func) {
    return func
        .toLowerCase()
        .replaceAll("x", "(X)")
        .replaceAll("cos", "Math.cos")
        .replaceAll("sin", "Math.sin")
        .replaceAll("sen", "Math.sin")
        .replaceAll("sqrt", "Math.sqrt")
        .replaceAll("pi", "(Math.PI)")
        .replaceAll("^", "**")
        .replaceAll("e", "(Math.exp(1))");
}

Math.getExpressionValue = function (expression, x) {
    return eval(expression.replaceAll("X", x));
}
Math.GaussLegendre = function(f, x_s, ini, fim, n) {
    let expression = 0;
    for (let i = 0; i < n; ++i) {
        expression += f(x_s(ini, fim, legendre.r[n][i])) * legendre.w[n][i];
    }
    return (fim - ini) * expression / 2;
}