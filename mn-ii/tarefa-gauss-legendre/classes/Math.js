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
        .replaceAll("e", "1*(Math.exp(1))");
}

Math.getExpressionValue = function(expression, x) {
    return eval(expression.replaceAll("X", x));
}
Math.GaussLegendre = function(f, x_s, ini, fim, n) {
    let expression = 0;
    for (let i = 0; i < n; ++i) {
        expression += f(x_s(ini, fim, legendre.r[n][i])) * legendre.w[n][i];
    }
    return (fim - ini) * expression / 2;
}