Math.getExpressionString = function (func) {
  return func
    .toLowerCase()
    .replaceAll("º", " deg")
    .replaceAll("°", " deg")
    .replaceAll(",", ".")
    .replaceAll("sen", "sin")
    .replaceAll("pi", "3.1415926535");
};
Math.getExpressionValue = function (expression, x) {
  return eval(expression.replaceAll("X", x));
};
function x_s(ini, fim, s) {
  return (ini + fim + s * (fim - ini)) / 2;
}
Math.getExpressionValue = function (expression, x) {
  return eval(expression.replaceAll("X", x));
};
Math.GaussLegendre = function (fExp, f, ini, fim, n, a, b) {
  let expression = 0;
  for (let i = 0; i < n; ++i) {
    expression +=
      fExp(x_s(ini, fim, legendre.r[n][i]), a, b, f) * legendre.w[n][i];
  }
  return ((fim - ini) * expression) / 2;
};
