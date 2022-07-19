var fechada = [
    [],
    [1/2, [1, 1]], // 1
    [1/3, [1, 4, 1]], // 2
    [3/8, [1, 3, 3, 1]], // 3
    [2/45, [7, 32, 12, 32, 7]] // 4
];
var aberta = [
    [2, [1]], // 0
    [3/2, [1, 1]], // 1
    [4/3, [2, -1, 2]], // 2
    [5/24, [11, 1, 1, 11]], // 3
    [6/20, [11, -14, 26, -14, 11]] // 4
];
function NewtonCotesFechada(f, ini, fim, n) {
    let expression = 0, formula = fechada[n];
    for (let i = 0; i <= n; ++i) {
        expression += f(x_s(ini, fim, i/n)) * formula[1][i];
    }
    return (fim - ini) * formula[0] * expression / n;
}
function NewtonCotesAberta(f, ini, fim, n) {
    let expression = 0, formula = aberta[n];
    for (let i = 1; i <= n + 1; ++i) {
        expression += f(x_s(ini, fim, i/(n + 2))) * formula[1][i-1];
    }
    return (fim - ini) * formula[0] * expression / (n + 2);
}